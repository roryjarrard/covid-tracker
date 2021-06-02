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
import Table from './components/Table'
import LineGraph from './components/LineGraph'
import { sortData } from './util'
import 'leaflet/dist/leaflet.css'

function App() {
  // --------------------------------------------------------------------- STATE
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({
    todayCases: 0,
    cases: 0,
    todayRecovered: 0,
    recovered: 0,
    todayDeaths: 0,
    deaths: 0,
  })
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796])
  const [mapZoom, setMapZoom] = useState(3)

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountry('worldwide')
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          data = data.filter((country) => country.countryInfo.iso2 !== null)
          const countries_data = data.map((country) => ({
            name: country.country, // United States, United Kingdom, etc.
            value: country.countryInfo.iso2, // USA, UK, etc.
          }))

          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries_data)
        })
    }

    getCountriesData()
  }, [])

  // ----------------------------------------------------------------- FUNCTIONS
  const onCountryChange = async (event) => {
    const countryCode = event.target.value

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)

        const position =
          countryCode === 'worldwide'
            ? [34.80746, -40.4796]
            : [data.countryInfo.lat, data.countryInfo.long]
        const zoomAmt = countryCode === 'worldwide' ? 3 : 4
        setMapCenter(position)
        setMapZoom(zoomAmt)
      })
  }

  // ----------------------------------------------------------------------- JSX
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
                <MenuItem key={country.value} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox
            title='Coronavirus Cases'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title='Recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title='Deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map center={mapCenter} zoom={mapZoom} />
      </div>

      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          <h3>Worldwide New Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
