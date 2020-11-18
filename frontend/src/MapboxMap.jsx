/* Map feature that displays markers from a list of coords */
import * as React from 'react';
import {Component} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import pin from './pin.png';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const places = [
  { id: 1, pos: {lat: 37.772, lng: -122.214} },
  { id: 2, pos: {lat: 29.772, lng: -102.214} },
  { id: 3, pos: {lat: 42.418560, lng: -71.106453} },
  { id: 4, pos: {lat: 51.507351, lng: -0.127758} } 
]

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100vw",
        height: "100vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 5
      }
    };
  }

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        width={viewport.width}
        height={viewport.height}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        // eslint-disable-next-line no-shadow
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {
          places.map(
            city => 
              <Marker key={city.id} longitude={city.pos.lng} latitude={city.pos.lat}><img alt="pin" src={pin} /></Marker>
          )
        }
      </MapGL>
    );
  }
}

export default Map;