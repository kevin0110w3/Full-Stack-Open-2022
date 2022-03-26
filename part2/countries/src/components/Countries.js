const Countries = ({ city, setCity, countries, showCountry, setShowCountry }) => {
    const handleClick = (country) => {
      const handler = () => {
        setShowCountry(country);
        setCity(country.capital[0]);
      }
  
      return handler
    }
  
    return (
      <ul>
        {countries.map(country => {
          return (
            <li key={country.name.common}>{country.name.common}<button onClick={handleClick(country)}>show</button></li>
          )
        })
        };
      </ul>
    )
  }

  export default Countries