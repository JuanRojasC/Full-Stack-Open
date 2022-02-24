import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function App() {

  const [allCountries, setAllCountries] = useState([])
  const [countriesFound, setCountriesFound] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const countriesQty = countriesFound.length

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handlerCountrySearch = e => {
    e.preventDefault()
    const matchCountries = allCountries.filter(c => c.name.common.toLowerCase().includes(countrySearch.toLowerCase()))
    setCountriesFound(matchCountries.length > 10? [] : matchCountries)
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
              <ul>{countriesFound.map(c => <li key={nanoid()}>{c.name.common} <button onClick={e => setCountriesFound([c])}>show</button></li>)}</ul>
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
            </div> : 
            countriesQty > 0? 'Too many matches. specify another filter' : ''
        }
    </div>
  );
}

export default App;
