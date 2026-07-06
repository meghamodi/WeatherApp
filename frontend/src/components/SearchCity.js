
// This is a default import meaning the name should be imported as it is
// controlled component as data is being handled by react
export default function SearchCity({data,handleCityName,handleWeatherData}){

return (
    
    <form className="inputParams" onSubmit={handleWeatherData}>
        <input id="city" onChange={handleCityName} value={data} placeholder="city name"/>
        <button type="submit">Forecast</button>
      </form>
)
}