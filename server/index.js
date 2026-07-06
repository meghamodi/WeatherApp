import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import pool from './db.js';
import client from 'prom-client';
import logger from './logger.js';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const app = express();
app.use(express.json())

// Prometheus setup
client.collectDefaultMetrics();

const weatherRequestCounter = new client.Counter({
    name:'weather_requests_total',
    help:'Total number of weather API requests',
    labelNames: ['status'],
});

const weatherCacheHits = new client.Counter({
    name:'weather_cache_hits_total',
    help:'Total number of requests served from cache',
});

app.use((req, res, next) => {
    req.requestId = uuidv4();
    req.startTime = Date.now();
    next();
  });

  app.use((req, res, next) => {
    res.on('finish', () => {
      logger.info('request completed', {
        requestId: req.requestId,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs: Date.now() - req.startTime,
      });
    });
    next();
  });

app.get('/metrics',async(req,res)=>{
    res.set('Content-Type',client.register.contentType);
    res.end(await client.register.metrics());
})
// test connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'DB connection failed' });
  }
});
// This endpoint is used for fetching data from weather api
app.get('/weatherData/:cityName',async(req,res)=>{
    const cityName = req.params.cityName
    let status = '2xx';
    logger.info('Received request for weather data', {
        requestId: req.requestId,
        city: cityName,
      });
    if (!cityName || cityName.trim()==="" ){
        status = '4xx';
        logger.warn('City name missing', { requestId: req.requestId });
     
        return res.status(400).json({error:'city name not found'})
    }
    try {
    const { rows } = await pool.query(
        'SELECT * FROM weather_cache WHERE city = $1 AND updated_at > NOW() - INTERVAL \'1 hour\'',
        [cityName]
      );
      
  
      if (rows.length > 0) {
        weatherCacheHits.inc();
        
        return res.json(rows[0].data);
      }
    
    const url = `https://open-weather13.p.rapidapi.com/city/${cityName}/EN`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': process.env.RAPID_API_HOST,
            Accept: 'application/json'
        }
    }
       
    const response = await fetch(url,options);

    if (!response.ok){
      throw new Error(`API Status: ${response.status}`)
    }

    const result = await response.json();

    if (result.cod === "404" || result.cod === 404){
      status = '4xx';
      logger.warn("City not found", {
        requestId: req.requestId,
        city: cityName,
    });
      return res.status(404).json({
        error: "City not found",
    });
  }

    await pool.query(
        `INSERT INTO weather_cache (city, data, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (city)
         DO UPDATE SET data = $2, updated_at = NOW()`,
        [cityName, result]
      );
    logger.info('Fetched and cached weather data', { requestId: req.requestId, city: cityName });
    res.json(result)

    }catch(error){
        logger.error('Weather request failed', {
            requestId: req.requestId,
            city: cityName,
            error: error.message,
            stack: error.stack,
        });
        status = '5xx';
        return res.status(500).json({
          error:'Something went wrong'
        })
        

    }finally{
      weatherRequestCounter.inc({ status });
    }
})


app.listen(3000,'0.0.0.0', ()=>{
    logger.info('Server started', {
        port: 3000
      });
})