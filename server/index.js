import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});


const app = express();
app.use(express.json())
// This endpoint is used for fetching data from weather api
app.get('/weatherData/:cityName',async(req,res)=>{
    const cityName = req.params.cityName
    const url = `https://open-weather13.p.rapidapi.com/city/${cityName}/EN`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': process.env.RAPID_API_HOST,
            Accept: 'application/json'
        }
    };
    try {
        const response = await fetch(url,options);
        if (!response.ok){
            throw new Error(`API Status: ${response.status}`)
        }
        const result = await response.json();
        console.log(result)

        res.json(result)

    }catch(error){
        console.error(error)
        res.status(500).json({error:'Something went wrong'})
    }

})
app.listen(6000,()=>{
    console.log("it is working")
})