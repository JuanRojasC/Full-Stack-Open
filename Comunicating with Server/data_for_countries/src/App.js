import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function App() {

  const [allCountries, setAllCountries] = useState([])
  const [countriesFound, setCountriesFound] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const countriesQty = countriesFound.length
  const api_key = process.env.REACT_APP_API_WEATHER_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const getWeather = c => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${c.latlng[0]}&lon=${c.latlng[1]}&units=metric&appid=${api_key}`)
      .then(response => {
        const res = response.data
        const weather = {description: res.weather[0].description, icon: res.weather[0].icon, temp: res.main.temp, windSpeed: res.wind.speed}
        c.weather = weather
        setCountriesFound([c])
      })
  }

  const handlerCountrySearch = e => {
    e.preventDefault()
    const weather = {description: '', icon: '', temp: 0, windSpeed: 0}
    const matchCountries = (allCountries.filter(c => c.name.common.toLowerCase().includes(countrySearch.toLowerCase()))).map(c => { return {...c, weather: weather}})
    setCountriesFound(matchCountries)
    if(matchCountries.length == 1){
      getWeather(matchCountries[0])
    }
  }

  const handlerShowMore = c => {
    getWeather(c)
  }

  return (
    <div className="App">
      <form onSubmit={handlerCountrySearch}>
        <div>
          find countries: <input onChange={e => setCountrySearch(e.target.value)}/>
        </div>
        <button type="submit">find</button>
      </form>
        {
          countriesQty > 1 && countriesQty < 10? 
            <div>
              <h2>Results</h2>
              <ul>{countriesFound.map(c => <li key={nanoid()}>{c.name.common} <button onClick={e => handlerShowMore(c)}>show</button></li>)}</ul>
            </div> :
          countriesQty === 1?
            <div>
              <h2>{countriesFound[0].name.common}</h2>
              <div>
                <div>Capital: {countriesFound[0].capital}</div>
                <div>Area: {countriesFound[0].area}</div>
                <h2>Languages</h2>
                <ul>{(Object.values(countriesFound[0].languages)).map(l => <li key={nanoid()}>{l}</li>)}</ul>
              </div>
              <img src={countriesFound[0].flags.png}/>
              <div>
                <h2>Weather in {countriesFound[0].name.common}</h2>
                <div>Temperature: {countriesFound[0].weather.temp} Celcius</div>
                <div>Weather: {countriesFound[0].weather.description}</div>
                <img src={`https://openweathermap.org/img/wn/${countriesFound[0].weather.icon}@2x.png`}/>
                <div>Wind: {countriesFound[0].weather.windSpeed} m/s</div>
              </div>

            </div> : 
            countriesQty > 0? 'Too many matches. specify another filter' : ''
        }
    </div>
  );
}

export default App;
