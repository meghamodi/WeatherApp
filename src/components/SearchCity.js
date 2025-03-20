
// This is a default import meaning the name should be imported as it is
// controlled component as data is being handled by react
export default function SearchCity({data,handleCityName,handleWeatherData}){

return (
    
    <div className="inputParams">
        <input id="city" onChange={handleCityName} value={data} placeholder="city name"/>
        <button type="submit" onClick={handleWeatherData}>Forecast</button>
      </div>
)
}