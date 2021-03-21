/* Map feature that displays markers from a list of coords */
import * as React from 'react';
import { Component } from 'react';
import MapGL, { Marker, WebMercatorViewport } from 'react-map-gl';
import Pin from './pin.png';
import "./MapboxMap.css";


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const places = [
  { id: 1, pos: {lat: 37.772, lng: -122.214}, name: "California", address: "123 Lily Road, CA, United States"},
  { id: 2, pos: {lat: 29.772, lng: -102.214}, name: "Mexico", address: "52 Main Street, Mexico" },
  { id: 3, pos: {lat: 42.418560, lng: -71.106453}, name: "Massachusetts", address: "103 Professors Row, MA, United States" },
  { id: 4, pos: {lat: 51.507351, lng: -0.127758}, name: "United Kingdom", address: "4 Privet Drive, United Kingdom" },
  { id: 5, pos: {lat: 41.436404, lng: -87.71741}, name: "Illinois", address: "510 52nd Street, IL, United States" },
  { id: 6, pos: {lat: 19.65513, lng: -155.41502}, name: "Hawaii", address: "11 Clover Lane, HI, United States" }, 
  { id: 7, pos: {lat: -2.7018522, lng: -51.92381}, name: "Brazil", address: "5 Parker Court, Brazil" }
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
        width: "100%",
        height: "100%",
      }, 
      viewState: {
        latitude,
        longitude,
        zoom
      }
    });
  }

  onLocationClick = (newLatitude, newLongitude) => {
    
    this.setState({ 
      viewport: {
        width: "100%",
        height: "100%",
      }, 
      viewState: {
        latitude: newLatitude,
        longitude: newLongitude,
        zoom: 15
      }
    });

  }

  render() {
    const { viewport, viewState } = this.state;
    
    return (
      <div className="mapComponent">
        
        <div className="mapLocationListContainer">
          {places.map((city) => (
            <div className="mapLocationRectangles">
              <p className="mapAddressName">  
                {city.name} 
              </p>
              <p className="mapAddress">
                {city.address}
              </p>
              <p className="mapBulletPoints" /> 
              <button className="locationButtons" type="button" onClick={() => this.onLocationClick(city.pos.lat, city.pos.lng)}>  </button>
            </div>
          ))}
        </div>
        
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
      </div>
    );
  }
}

export default Map; 
