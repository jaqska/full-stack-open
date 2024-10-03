import { useEffect, useState } from 'react'
import axios from 'axios'

const RenderCountries = ({ country, countries, filteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [weatherDescription, setWeatherDescription] = useState(null)
  const [icon, setIcon] = useState(null)
  
  const countryToShow = selectedCountry || (filteredCountries.length === 1 ? filteredCountries[0] : null)
  const lat = countryToShow ? countryToShow.capitalInfo.latlng[0] : null
  const lon = countryToShow ? countryToShow.capitalInfo.latlng[1] : null
  const capital = countryToShow ? countryToShow.capital[0] : null
  
  useEffect(() => {
    if (lat && lon) {
      const baseUrl = 'https://api.openweathermap.org/data/'
      const api_key = import.meta.env.VITE_OPENWEATHER_KEY

      axios
        .get(`${baseUrl}3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
        .then(response => {
          setTemperature(response.data.current.temp)
          setWindSpeed(response.data.current.wind_speed)
          setWeatherDescription(response.data.current.weather[0].description)
        })
        .catch(error => console.log('Error retrieving data from server', error))
      
      axios
        .get(`${baseUrl}2.5/weather?q=${capital}&appid=${api_key}`)
        .then(response => setIcon(response.data.weather[0].icon))
        .catch(error => console.log('Error retrieving data from server', error))
    }

    
  }, [lat, lon])

  if (country === null || countries === null) {
    return <p>Loading countries...</p>
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, please specify further.</p>
  }

  if (!countryToShow) {
    return (
      <ul>
        {filteredCountries.map(country => (
          <div key={country.name.common}>
            <li>{country.name.common}</li>
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </div>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2>{countryToShow.name.common}</h2>
      <p>Capital: {countryToShow.capital}</p>
      <p>Area: {countryToShow.area} km²</p>
      <p>Languages: {Object.values(countryToShow.languages).join(', ')}</p>
      <img
        src={countryToShow.flags.svg}
        alt={`Flag of ${countryToShow.name.common}`}
        style={{ width: '150px', border: '1px solid black' }}
      />
      <h3>Weather in {countryToShow.capital}</h3>
      <p>{weatherDescription !== null ? `${weatherDescription}` : 'Loading...'}</p>
      <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Weather Icon"
        />
      <p>Temperature: {temperature !== null ? `${temperature}°C` : 'Loading...'}</p>
      <p>Wind speed: {windSpeed !== null ? `${windSpeed} m/s` : 'Loading...'} </p>
      <button onClick={() => setSelectedCountry(null)}>Back to list</button>
    </div>
  )
}

export default RenderCountries
