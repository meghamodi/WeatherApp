import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import pool from './db.js';
import client from 'prom-client';
import logger from './logger.js';
dotenv.config();

const app = express();
app.use(express.json())

// Prometheus setup
client.collectDefaultMetrics();

const weatherRequestCounter = new client.Counter({
    name:'weather_requests_total',
    help:'Total number of weather API requests',
});

const weatherCacheHits = new client.Counter({
    name:'weather_cache_hits_total',
    help:'Total number of requests served from cache',
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
    logger.log('info',`Received request for weather data of ${cityName}`)
    if (!cityName || cityName.trim()===""){
        logger.log('warn', {
                city: cityName,
                message: 'City name missing'
          });
        return res.status(400).json({error:'city name required'})
    }
    try {
    const { rows } = await pool.query(
        'SELECT * FROM weather_cache WHERE city = $1 AND updated_at > NOW() - INTERVAL \'1 hour\'',
        [cityName]
      );
      weatherRequestCounter.inc();
  
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

    await pool.query(
        `INSERT INTO weather_cache (city, data, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (city)
         DO UPDATE SET data = $2, updated_at = NOW()`,
        [cityName, result]
      );
      logger.log('info',`Cached new weather data for ${cityName}`)
    res.json(result)

    }catch(error){
        
        logger.log('error', {
            city: cityName,
            error: error.message
          });
        res.status(500).json({error:'Something went wrong'})
    }
})


app.listen(3000,'0.0.0.0', ()=>{
    console.log("it is working")
})