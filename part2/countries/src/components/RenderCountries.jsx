import { useEffect, useState } from 'react'
const RenderCountries = ({ country, countries, filteredCountries}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  if (country === null || countries === null) {
    return <p>Loading countries...</p>
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, please specify further.</p>
  } 
  
  if (selectedCountry) {
    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Area: {selectedCountry.area} km²</p>
        <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
        <img
          src={selectedCountry.flags.svg}
          alt={`Flag of ${selectedCountry.name.common}`}
          style={{ width: '150px', border: '1px solid black' }}
        />
        <br/>
        <button onClick={() => setSelectedCountry(null)}> Back to list </button>
      </div>
    )
  } 
  
  if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            <li>{country.name.common}</li>
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </div>
        ))}
      </ul>
    )
  } 
  
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <p>Languages: {Object.values(country.languages).join(', ')}</p>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          style={{ width: '150px', border: '1px solid black' }}
        />
      </div>
    )
  } 
  
  return <p>No matches found</p>
  
}

export default RenderCountries