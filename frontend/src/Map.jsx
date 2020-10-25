/* Map component: Displays Google Maps with map markers plotting the locations 
on the map. */

import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

/* Array of long/lat pairs */
const places = [
  { id: 1, pos: {lat: 37.772, lng: -122.214} },
  { id: 2, pos: {lat: 29.772, lng: -102.214} },
  { id: 3, pos: {lat: 42.418560, lng: -71.106453} },
  { id: 4, pos: {lat: 51.507351, lng: -0.127758} } 
]

/* 
 Update bounds of map when a new marker is added so that map shows 
 all markers in one view.
 */
const fitBounds = map => {
  const bounds = new window.google.maps.LatLngBounds();
  places.map(place => {
    bounds.extend(place.pos);
    return place.id;
  });

  map.fitBounds(bounds);
};

function Map() {   
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={places[0].pos}
        zoom={5}
        onLoad={fitBounds}
      >
      
        { /* Markers rendered from list of positions */
          places.map(place => (          
            <Marker 
              key={place.id} 
              position={place.pos} 
            />
          ))
        }          

      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)