const Country = ({ country, weatherDeetz }) => {
    const languages = Object.values(country.languages)
    if (Object.keys(weatherDeetz).length !== 0) {
      return (
        <>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
  
          <p><b>languages:</b></p>
          <ul>
            {languages.map(language => <li key={language}>{language}</li>)};
          </ul>
          <img src={country.flags.png} alt="flag" />
          <h2>Weather in {country.capital}</h2>
          <p>temperature {(weatherDeetz.main.temp - 273.15).toFixed(2)} celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weatherDeetz.weather[0].icon}@2x.png`} alt="flag" />
          <p>wind {weatherDeetz.wind.speed} meter/sec</p>
        </>
      )
    } else {
      return (
        <>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
  
          <p><b>languages:</b></p>
          <ul>
            {languages.map(language => <li key={language}>{language}</li>)};
          </ul>
          <img src={country.flags.png} alt="flag" />
        </>
      )
    }
  }

  export default Country