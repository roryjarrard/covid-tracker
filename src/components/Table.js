import React from 'react'
import numeral from 'numeral'
import '../css/Table.css'

function Table({ countries }) {
  return (
    <div className='table'>
      {countries.map(({ country, cases, countryInfo }) => (
        <tr key={countryInfo.iso2}>
          <td>{country}</td>
          <td className='td-cases'>
            <strong>{numeral(cases).format('')}</strong>
          </td>
        </tr>
      ))}
    </div>
  )
}

export default Table
