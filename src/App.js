import './App.css';
// import {useEffect} from 'react';
import {useState} from 'react';
import {OrbitProgress} from 'react-loading-indicators';
import SearchCity from './components/SearchCity.js'
import WeatherData from './components/WeatherData.js'
function App() {
  const [data,setData] = useState('');
  const [error,setError] = useState(null);
  const [cityData,setCityData] = useState('')
  const [isLoading,setisLoading] = useState(false)
  function handleWeatherData(e){
    e.preventDefault()
    setisLoading(true)
    const fetchCityData = async ()=>{
      try{
        setisLoading(true)
        setError(null)
        const resp = await fetch(`/weatherData/${data}`)

      if (!resp.ok){
        throw new Error(`Server error ${resp.status},${resp.statusText}`)
      }
        
        const result = await resp.json()
        setCityData(result)
        setisLoading(false)
      }catch(error){
          console.error(`something went wrong ${error}`)
          setError(error.message)
          setisLoading(false)
          setCityData(null)
      }
    }
fetchCityData()
  }
  function handleCityName(e){
    setData(e.target.value)
  }
  return (
  
    <div className="App">
      
      {
      isLoading ? (<OrbitProgress color="#32cd32" size="small" text="working" textColor="" />) :
      (
        <>
      <SearchCity data={data} handleCityName={handleCityName} handleWeatherData={handleWeatherData} />
      {error && <p style={{ color: 'red' }}> {error} </p>}

      <WeatherData cityData={cityData}/>
      </>
)}
    </div>
  );
}

export default App;
