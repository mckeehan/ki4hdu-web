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
    const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    const outlink = '<a href="http://thunderforest.com/">Thunderforest</a>';
    const attribution = '&copy; ' + mapLink + ' Contributors & ' + outlink;
    return (
      <MapContainer zoom='15' center={data.center}>
        <TileLayer
          url="http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=6aa24fdc4de84aee82dfeecfc3ca8e13"
          attribution={attribution}
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
