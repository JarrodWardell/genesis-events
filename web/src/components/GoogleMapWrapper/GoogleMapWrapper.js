import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const MapContainer = ({
  stores = [],
  center = {
    lat: 43.6487,
    lng: -79.38544,
  },
}) => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  }

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        defaultCenter={center}
        center={center}
      />
    </LoadScript>
  )
}

export default MapContainer
