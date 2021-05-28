import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'
import './App.css'

import InfoBox from './components/InfoBox'
import Map from './components/Map'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(['worldwide'])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries_data = data.map((country) => ({
            name: country.country, // United States, United Kingdom, etc.
            value: country.countryInfo.iso2, // USA, UK, etc.
          }))

          setCountries(countries_data)
        })
    }

    getCountriesData()
  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)
  }

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>

          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox title='Coronavirus Cases' cases={123} total={2000} />
          <InfoBox title='Recovered' cases={1234} total={3000} />
          <InfoBox title='Deaths' cases={12345} total={4000} />
        </div>
        <Map />
      </div>

      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide New Cases</h3>
        </CardContent>
        {/* Table */}
        {/* Graph */}
      </Card>
    </div>
  )
}

export default App
