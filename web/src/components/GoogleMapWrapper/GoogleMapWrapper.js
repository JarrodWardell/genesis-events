import React, { useEffect, useRef } from 'react';

const GMap = ({ center, stores = [] }) => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  useEffect(() => {
    if (window.google) {
      googleMap = initGoogleMap();
      stores.map(({ lat, lng }) => {
        createMarker(lat, lng);
      })
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

  return <div
    ref={googleMapRef}
    className='w-full h-screen max-h-screen'
  />
}

export default GMap;
