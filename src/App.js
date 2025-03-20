import './App.css';
// import {useEffect} from 'react';
import {useState} from 'react';

function App() {
  const [data,setData] = useState('');
  const [cityData,setCityData] = useState('')
  function handleWeatherData(e){
    e.preventDefault()
   
    fetch(`/weatherData/${data}`)

    .then((res)=> res.json())
    .then((result)=> setCityData(result))
    .catch((error)=>console.error('something wrong',error))
    

  }
  function handleCityName(e){
    setData(e.target.value)
  }
  return (
  
    <div className="App">
      {}
      <div className="inputParams">
        <input id="city" onChange={handleCityName} value={data} defaultValue="city name"/>
        <button type="submit" onClick={handleWeatherData}>Forecast</button>
        <p></p>
        
      </div>
      
    </div>
  );
}

export default App;
