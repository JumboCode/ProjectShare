/* Map feature that displays markers from a list of coords */
import * as React from 'react';
import { Component } from 'react';
import MapGL, { Marker, WebMercatorViewport } from 'react-map-gl';
import PropTypes from 'prop-types';
import Pin from './pin.png';
import "./MapboxMap.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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
    const { locations } = this.props;
    if (locations.length === 1) {
      this.onLocationClick(Number(locations[0].latitude), Number(locations[0].longitude))
    } else {
      /* Calculate pairs of min lnglat and max lnglat */
      const lat = locations.map(location => Number(location.latitude));
      const lng = locations.map(location => Number(location.longitude));

      const minCoords = [Math.min.apply(null, lng), Math.min.apply(null, lat)];
      const maxCoords = [Math.max.apply(null, lng), Math.max.apply(null, lat)];

      const bounds = [minCoords, maxCoords];
      /* Create new viewport with new bounds from calculations */
      const { viewport } = this.state;

      const vp = new WebMercatorViewport(viewport);
      const { longitude, latitude, zoom } = vp.fitBounds(bounds, { padding: 10 });

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
    const { locations } = this.props;
    return (
      <div className="mapComponent">
        
        <div className="mapLocationListContainer">
          {locations.map((loc) => (
            <div className="mapLocationRectangles" key={loc.id}>
              <li className="mapAddressName">  
                {loc.name} 
              </li>
              <p className="mapAddress">
                {loc.address}
              </p>
              <button
                className="locationButtons"
                type="button"
                onClick={() => this.onLocationClick(Number(loc.latitude), Number(loc.longitude))}
                aria-label="Move map to this location"
              />
            </div>
          ))}
        </div>
        
        <MapGL
          width={viewport.width}
          height={viewport.height}
          viewState={viewState}
          mapStyle="mapbox://styles/mapbox/light-v10"
          onViewportChange={vs => this.setState({viewState: vs})}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {
            locations.map(
              loc => 
                (
                  <Marker
                    key={loc.id}
                    longitude={Number(loc.longitude)}
                    latitude={Number(loc.latitude)}
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

Map.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    longitude: PropTypes.string,
    latitude: PropTypes.string,
  }))
}
Map.defaultProps = {
  locations: []
}