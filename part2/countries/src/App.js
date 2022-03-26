import { useState, useEffect } from 'react'
import axios from 'axios'
import HandleCountries from './components/HandleCountries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [showCountry, setShowCountry] = useState({});
  const [weatherDeetz, setWeatherDeetz] = useState({})
  const [city, setCity] = useState('');
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      .then(response => {
        setWeatherDeetz(response.data);
      })
  }, [city, api_key])

  const filterCountries = (event) => {
    event.preventDefault();

    const filtered = countries.filter(country => (country.name.common).toLowerCase().includes(filterText.toLowerCase()));
    setFilteredCountries(filtered);
    setShowCountry({})
    setCity('')
    
    if (filtered.length === 1) {
      setShowCountry(filtered[0]);
      setCity(filtered[0].capital[0]);
    }
  }

  const handleFilterText = (event) => setFilterText(event.target.value);

  return (
    <>
      <form onChange={filterCountries}>
        <div>
          find countries <input value={filterText} onChange={handleFilterText} />
        </div>
      </form>
      <HandleCountries city={city} setCity={setCity} weatherDeetz={weatherDeetz} filteredCountries={filteredCountries} showCountry={showCountry} setShowCountry={setShowCountry} />
    </>
  )
}

export default App;