// From https://github.com/andrewl/gatsby-geo-simple-map
import React, { useRef, } from "react";
import { MapContainer, TileLayer, FeatureGroup, } from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { TrackLine, WaypointMarker} from './gpxComponents'
import UpdateMapPosition from './updateMapViewportLogic'
import './leafletmap.css';

import 'react-leaflet-fullscreen/styles.css'

const LeafletMap = ({ data }) => {
    const groupRef = useRef()
    return (
      <MapContainer zoom='15' center={data.center}>
        <TileLayer
          url="https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=yoMjNkrKO1TYRL38x7Qu"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        <FullscreenControl position="topright" forceSeparateButton="true" />
        <FeatureGroup ref={groupRef}>
          {data.tracks.map( track => {
            return ( <TrackLine track={track} /> )
          })}
          {data.waypoints.map( waypoint => {
              return (<WaypointMarker waypoint={waypoint} />)
          })}
        </FeatureGroup>
        <UpdateMapPosition groupRef={groupRef} />
      </MapContainer>
    );
}

export default LeafletMap;
