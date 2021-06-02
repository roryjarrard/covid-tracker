import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import '../Map.css'

const MapPlaceholder = () => {
  return (
    <MapContainer center={[34.80746, -40.4796]} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  )
}

function Map({ center, zoom }) {
  const [map, setMap] = useState(MapPlaceholder())

  useEffect(() => {
    const time = new Date().getTime()
    setMap(
      <MapContainer
        key={JSON.stringify(center) + time}
        center={center}
        zoom={zoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    )
  }, [center, zoom])

  return <div className='map'>{map}</div>
}

export default Map
