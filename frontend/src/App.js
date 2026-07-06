import './App.css';
import {useState} from 'react';
import {OrbitProgress} from 'react-loading-indicators';
import SearchCity from './components/SearchCity.js'
import WeatherData from './components/WeatherData.js'
import {Header} from './components/Header';
function App() {
  const [data,setData] = useState('');
  const [error,setError] = useState(null);
  const [cityData,setCityData] = useState(null)
  const [isLoading,setisLoading] = useState(false)
  function handleWeatherData(e){
    e.preventDefault()

    const fetchCityData = async ()=>{
      try{
        setisLoading(true)
        setError(null)
        setCityData(null);
        const resp = await fetch(`/weatherData/${data}`)

      if (!resp.ok){
        const errorData =await resp.json();
        throw new Error(errorData.error);
      }
        
        const result = await resp.json()
        setCityData(result)
      }catch(error){
          console.error(`something went wrong ${error}`)
          setError(error.message)
          setCityData(null)
    } finally {
      setisLoading(false);
    }
    };
fetchCityData()
  }
  function handleCityName(e){
    setData(e.target.value)

  }
  return (
  
    <div className="App">
      <Header>
        Weather App
      </Header>
      
      {
      isLoading ? (<OrbitProgress color="#32cd32" size="small" text="working" textColor="" />) :
      (
        <>
      <SearchCity 
      data={data} 
      handleCityName={handleCityName} 
      handleWeatherData={handleWeatherData} 
      />
      {error && <p style={{ color: 'red' }}> {error} </p>}

      {!cityData && !error && (
          <p>Search a city to see weather</p>
      )}

      {cityData && <WeatherData cityData={cityData}/>}

      </>
)}

    </div>
  );
}


export default App;
