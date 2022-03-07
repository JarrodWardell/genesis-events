import React, { useEffect, useRef } from 'react';

const GMap = ({ center, stores = [], height = '80vh', onMapLoad = () => {} }) => {
  const [googleMap, setGoogleMap] = React.useState(null);
  let googleMapRef = useRef(null)

  useEffect(() => {
    if (window.google) {
      setGoogleMap(initGoogleMap())
      stores.map(({ lat, lng }) => {
        createMarker(lat, lng);
      })
      onMapLoad(googleMapRef.current);
    }
  }, [window.google, center, stores]);


  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center,
      zoom: 13
    });
  }

  // create marker on google map
  const createMarker = (lat, lng) => new window.google.maps.Marker({
    position: { lat, lng },
    map: googleMap
  });

  return (
    <div
      ref={googleMapRef}
      className='w-full'
      style={{
        height
      }}
    />
  )
}

export default GMap;
