// App (Parent)
//  ├──> Passes cityData as a prop to WeatherData
//  ├──> WeatherData (Child) receives and displays the data

export default function WeatherData({cityData}){
  if (!cityData) return null;
  const { name, weather, main, sys } = cityData;
  return (
      <div>
      {name && <h3>Weather for {name}</h3>}
      {weather?.length > 0 && (
        <div>
          {weather.map((w, idx) => (
            <div key={idx} className="weather-card">
              <p><strong>Weather:</strong> {w.main}</p>
              <p><strong>Description:</strong> {w.description}</p>
            </div>
          ))}
        <div className="weather-details">
          
        <p><strong>Temperature:</strong> {main?.temp}°C</p>
            <p><strong>Humidity:</strong> {main?.humidity}%</p>
            <p><strong>Sunrise:</strong> {new Date(sys?.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> {new Date(sys?.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}