import Countries from './Countries';
import Country from './Country';

const HandleCountries = ({ city, setCity, weatherDeetz, filteredCountries, showCountry, setShowCountry }) => {
    if (Object.keys(showCountry).length !== 0) {
      return (
        <Country country={showCountry} weatherDeetz={weatherDeetz} />
      )
    } else if (filteredCountries.length > 10) {
      return (
        <>Too many matches, specify another filter</>
      )
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        <Countries city={city} setCity={setCity} countries={filteredCountries} showCountry={showCountry} setShowCountry={setShowCountry} />
      )
    } else if (filteredCountries.length === 1) {
      return (
        <Country country={showCountry} weatherDeetz={weatherDeetz} />
      )
    } return (
      <></>
    )
  }

  export default HandleCountries