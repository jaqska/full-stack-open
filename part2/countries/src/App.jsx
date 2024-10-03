import { useEffect, useState } from 'react'
import axios from 'axios'
import RenderCountries from './components/RenderCountries'

function App() {
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        console.log('Countries successfully retrieved from database...')
      })
      .catch(error => {
        console.log('Error fetching all countries:', error)
      })
  }, [])



  const handleChange = (event) => {
    const searchName = event.target.value
    setCountry(searchName)

    if (searchName === '') {
      setFilteredCountries([])
    } else if (countries) {
      const matchingCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchName.toLowerCase())
      )
      setFilteredCountries(matchingCountries)
    }
  }

  return (
    <div>
      <form>
        search countries: <input value={country || ''} onChange={handleChange} />
      </form>
      <RenderCountries 
      country={country} 
      countries={countries} 
      filteredCountries={filteredCountries} />
    </div>
  )
}

export default App
