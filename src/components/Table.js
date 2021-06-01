import React from 'react'

function Table({ countries }) {
  return (
    <div className='table'>
      {countries.map(({ country, cases, countryInfo }) => (
        <tr key={countryInfo.iso2}>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  )
}

export default Table
