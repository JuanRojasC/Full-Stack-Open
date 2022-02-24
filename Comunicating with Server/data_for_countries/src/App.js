import axios from "axios";
import { nanoid } from "nanoid";
import { useState } from "react";

function App() {

  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const countriesQty = countries.length

  const handlerCountrySearch = e => {
    e.preventDefault()
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const matchCountries = response.data.filter(c => c.name.common.toLowerCase().includes(countrySearch.toLowerCase()))
        setCountries(matchCountries.length > 10? [] : matchCountries)
      })
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
            <div><h2>Results</h2><ul>{countries.map(c => <li key={nanoid()}>{c.name.common}</li>)}</ul></div> :
          countriesQty === 1?
            <div>
              <h2>{countries[0].name.common}</h2>
              <div>
                <div>Capital: {countries[0].capital}</div>
                <div>Area: {countries[0].area}</div>
                <h2>Languages</h2>
                <ul>{(Object.values(countries[0].languages)).map(l => <li key={nanoid()}>{l}</li>)}</ul>
              </div>
              <img src={countries[0].flags.png}/>
            </div> : 
            countriesQty > 0? 'Too many matches. specify another filter' : ''
        }
    </div>
  );
}

export default App;
