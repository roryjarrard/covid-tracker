import { useState, useEffect } from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countriesdata = data.map((country) => ({
            name: country.country, // United States, United Kingdom, etc.
            value: country.countryInfo.iso2, // USA, UK, etc.
          }))

          setCountries(countriesdata)
        })
    }

    getCountriesData()
  }, [])

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>

        <FormControl className='app__dropdown'>
          <Select variant='outlined' value='abc' onChange={() => {}}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select input dropdown field  */}

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  )
}

export default App
