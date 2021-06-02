import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import '../css/Map.css'

import { showDataOnMap } from '../util.js'

function Map({ center, casesType = 'cases', zoom, countries }) {
  const [key, setKey] = useState('')

  useEffect(() => {
    const time = new Date().getTime()
    setKey(JSON.stringify(center) + time)
  }, [center, zoom])

  return (
    <div className='map'>
      <MapContainer key={key} center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {showDataOnMap(countries, (casesType = 'cases'))}
      </MapContainer>
    </div>
  )
}

export default Map
