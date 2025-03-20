import './App.css';
// import {useEffect} from 'react';
import {useState} from 'react';
import SearchCity from './components/SearchCity.js'
import WeatherData from './components/WeatherData.js'
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
      <SearchCity data={data} handleCityName={handleCityName} handleWeatherData={handleWeatherData} />
      <WeatherData cityData={cityData}/>
    </div>
  );
}

export default App;
