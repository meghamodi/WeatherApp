// App (Parent)
//  ├──> Passes cityData as a prop to WeatherData
//  ├──> WeatherData (Child) receives and displays the data

export default function WeatherData({cityData}){
    return (
        <div>
        {cityData.weather && cityData.weather.length > 0 && (
        <div>
        {cityData.name && <h3>Weather for {cityData.name}</h3>}
        
        {cityData.weather.map((weatherId,idx) =>(
          <div key={idx}>
            
            <p>{weatherId.main}</p>
            <p>{weatherId.description}</p>
          </div>
        ))}  
      </div>
    )}
    </div>
    )
}