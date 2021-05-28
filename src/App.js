import { useState } from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import './App.css'

function App() {
  const [countries, setCountries] = useState(['USA', 'UK', 'India'])

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>

        <FormControl className='app__dropdown'>
          <Select variant='outlined' value='abc' onChange={() => {}}>
            {countries.map((country) => (
              <MenuItem value={country}>{country}</MenuItem>
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
