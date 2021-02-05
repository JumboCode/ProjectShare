/* Map feature that displays markers from a list of coords */
import * as React from 'react';
import { Component } from 'react';
import MapGL, { Marker, WebMercatorViewport } from 'react-map-gl';
import Pin from './pin.png';

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
        width: 650,
        height: 650,
      },
      viewState: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    };
  }

  componentDidMount() { 
    /* Calculate pairs of min lnglat and max lnglat */
    const lat = places.map(location => Number(location.pos.lat));
    const lng = places.map(location => Number(location.pos.lng));
    
    const minCoords = [Math.min.apply(null, lng), Math.min.apply(null, lat)];
    const maxCoords = [Math.max.apply(null, lng), Math.max.apply(null, lat)];
    const bounds = [minCoords, maxCoords];  

    /* Create new viewport with new bounds from calculations */
    const { viewport } = this.state;
    
    const vp = new WebMercatorViewport(viewport); 
    const {longitude, latitude, zoom} = vp.fitBounds(bounds, {padding: 10});    

    this.setState({ 
      viewport: {
        width: "100vw",
        height: "100vh",
      }, 
      viewState: {
        latitude,
        longitude,
        zoom
      }
    });
  }

  render() {
    const { viewport, viewState } = this.state;
    
    return (
      <MapGL
        width={viewport.width}
        height={viewport.height}
        viewState={viewState}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={vs => this.setState({viewState: vs})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {
          places.map(
            city => 
              (
                <Marker
                  key={city.id}
                  longitude={city.pos.lng}
                  latitude={city.pos.lat}
                  offsetLeft={-32/2}
                  offsetTop={-32}
                >
                  <img src={Pin} alt="pin" width="32px" height="32px" />
                </Marker>
              )
          )
        }
      </MapGL>
    );
  }
}

export default Map; 
