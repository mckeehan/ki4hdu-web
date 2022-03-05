import * as React from "react"
import L from 'leaflet';
import { Link } from 'gatsby'
import { Polyline, Marker, Popup } from "react-leaflet";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { FaTag, FaFile, FaFolder } from 'react-icons/fa'

let iconCollection = {
    getIcon: function(sym) {
      let symbolName = sym ? sym.toLowerCase().replace(/ /,"-") : "default";
      let symbol = this[symbolName];
      if ( !symbol ) {
        Object.keys(this).forEach(function(key,index) {
          if( key.startsWith(symbolName) ) {
            symbolName = key;
          }
        });
        symbol = this[symbolName];
      }
      return symbol || this["default"];
    }
}

if ( typeof window !== 'undefined' ) {
  iconCollection = {
    "default": new L.Icon({ iconUrl: `/gpxicons/black-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "10w1h": new L.Icon({ iconUrl: `/gpxicons/10w1h.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "20w1h": new L.Icon({ iconUrl: `/gpxicons/20w1h.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "airport-24": new L.Icon({ iconUrl: `/gpxicons/airport-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "airport3": new L.Icon({ iconUrl: `/gpxicons/airport3.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "airport4": new L.Icon({ iconUrl: `/gpxicons/airport4.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "airport5": new L.Icon({ iconUrl: `/gpxicons/airport5.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "amusement-park1": new L.Icon({ iconUrl: `/gpxicons/amusement-park1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "anchor1": new L.Icon({ iconUrl: `/gpxicons/anchor1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "attraction": new L.Icon({ iconUrl: `/gpxicons/attraction.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "ball-park1": new L.Icon({ iconUrl: `/gpxicons/ball-park1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bank1": new L.Icon({ iconUrl: `/gpxicons/bank1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bar1": new L.Icon({ iconUrl: `/gpxicons/bar1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "beach": new L.Icon({ iconUrl: `/gpxicons/beach.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "beach2": new L.Icon({ iconUrl: `/gpxicons/beach2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bear": new L.Icon({ iconUrl: `/gpxicons/bear.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bell1": new L.Icon({ iconUrl: `/gpxicons/bell1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bicycle-24": new L.Icon({ iconUrl: `/gpxicons/bicycle-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bike-trail1": new L.Icon({ iconUrl: `/gpxicons/bike-trail1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "binoculars": new L.Icon({ iconUrl: `/gpxicons/binoculars.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bird": new L.Icon({ iconUrl: `/gpxicons/bird.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "black-pin": new L.Icon({ iconUrl: `/gpxicons/black-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "blue-block1": new L.Icon({ iconUrl: `/gpxicons/blue-block1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "blue-flag1": new L.Icon({ iconUrl: `/gpxicons/blue-flag1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "blue-pin-down": new L.Icon({ iconUrl: `/gpxicons/blue-pin-down.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "blue-pin": new L.Icon({ iconUrl: `/gpxicons/blue-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "blue-pin1": new L.Icon({ iconUrl: `/gpxicons/blue-pin1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "boat-ramp2": new L.Icon({ iconUrl: `/gpxicons/boat-ramp2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bowling1": new L.Icon({ iconUrl: `/gpxicons/bowling1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bridge": new L.Icon({ iconUrl: `/gpxicons/bridge.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bridge3": new L.Icon({ iconUrl: `/gpxicons/bridge3.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "brown-pin": new L.Icon({ iconUrl: `/gpxicons/brown-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "building-24": new L.Icon({ iconUrl: `/gpxicons/building-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "building1": new L.Icon({ iconUrl: `/gpxicons/building1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "buoy-white2": new L.Icon({ iconUrl: `/gpxicons/buoy-white2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "bus": new L.Icon({ iconUrl: `/gpxicons/bus.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "cafe-24": new L.Icon({ iconUrl: `/gpxicons/cafe-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "cairn": new L.Icon({ iconUrl: `/gpxicons/cairn.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "camera-24": new L.Icon({ iconUrl: `/gpxicons/camera-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "campground2": new L.Icon({ iconUrl: `/gpxicons/campground2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "campsite-24": new L.Icon({ iconUrl: `/gpxicons/campsite-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "canoe": new L.Icon({ iconUrl: `/gpxicons/canoe.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "car-24": new L.Icon({ iconUrl: `/gpxicons/car-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "car-rental1": new L.Icon({ iconUrl: `/gpxicons/car-rental1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "car-repair1": new L.Icon({ iconUrl: `/gpxicons/car-repair1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "car1": new L.Icon({ iconUrl: `/gpxicons/car1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "cave": new L.Icon({ iconUrl: `/gpxicons/cave.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "cemetery-24": new L.Icon({ iconUrl: `/gpxicons/cemetery-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "cemetery1": new L.Icon({ iconUrl: `/gpxicons/cemetery1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "chemist-24": new L.Icon({ iconUrl: `/gpxicons/chemist-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "church1": new L.Icon({ iconUrl: `/gpxicons/church1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "circle-24": new L.Icon({ iconUrl: `/gpxicons/circle-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "city-24": new L.Icon({ iconUrl: `/gpxicons/city-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "city-large1": new L.Icon({ iconUrl: `/gpxicons/city-large1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "city-medium1": new L.Icon({ iconUrl: `/gpxicons/city-medium1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "city-small1": new L.Icon({ iconUrl: `/gpxicons/city-small1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "civil1": new L.Icon({ iconUrl: `/gpxicons/civil1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "cliff": new L.Icon({ iconUrl: `/gpxicons/cliff.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "climbing": new L.Icon({ iconUrl: `/gpxicons/climbing.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "controlled-area1": new L.Icon({ iconUrl: `/gpxicons/controlled-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "convenience-store2": new L.Icon({ iconUrl: `/gpxicons/convenience-store2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "crossing2": new L.Icon({ iconUrl: `/gpxicons/crossing2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "dam-24": new L.Icon({ iconUrl: `/gpxicons/dam-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "dam2": new L.Icon({ iconUrl: `/gpxicons/dam2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "danger-24": new L.Icon({ iconUrl: `/gpxicons/danger-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "danger-area1": new L.Icon({ iconUrl: `/gpxicons/danger-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "deer": new L.Icon({ iconUrl: `/gpxicons/deer.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "department-store1": new L.Icon({ iconUrl: `/gpxicons/department-store1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "disability-24": new L.Icon({ iconUrl: `/gpxicons/disability-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "disc-golf": new L.Icon({ iconUrl: `/gpxicons/disc-golf.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "diver-down-flag-11": new L.Icon({ iconUrl: `/gpxicons/diver-down-flag-11.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "diver-down-flag-21": new L.Icon({ iconUrl: `/gpxicons/diver-down-flag-21.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "dog-park-24": new L.Icon({ iconUrl: `/gpxicons/dog-park-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "drinking-water2": new L.Icon({ iconUrl: `/gpxicons/drinking-water2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "electric": new L.Icon({ iconUrl: `/gpxicons/electric.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "elk": new L.Icon({ iconUrl: `/gpxicons/elk.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "emergency-telephone-24": new L.Icon({ iconUrl: `/gpxicons/emergency-telephone-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fast-food-24": new L.Icon({ iconUrl: `/gpxicons/fast-food-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fast-food1": new L.Icon({ iconUrl: `/gpxicons/fast-food1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fence": new L.Icon({ iconUrl: `/gpxicons/fence.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fire-lookout": new L.Icon({ iconUrl: `/gpxicons/fire-lookout.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fire-station-24": new L.Icon({ iconUrl: `/gpxicons/fire-station-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fish": new L.Icon({ iconUrl: `/gpxicons/fish.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fishing-area-thumb2": new L.Icon({ iconUrl: `/gpxicons/fishing-area-thumb2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fishing-facility1": new L.Icon({ iconUrl: `/gpxicons/fishing-facility1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fitness-center2": new L.Icon({ iconUrl: `/gpxicons/fitness-center2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "forest": new L.Icon({ iconUrl: `/gpxicons/forest.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "forest1": new L.Icon({ iconUrl: `/gpxicons/forest1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "fuel-24": new L.Icon({ iconUrl: `/gpxicons/fuel-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "garden-24": new L.Icon({ iconUrl: `/gpxicons/garden-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "gasoline2": new L.Icon({ iconUrl: `/gpxicons/gasoline2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "gate": new L.Icon({ iconUrl: `/gpxicons/gate.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "geocache-found1": new L.Icon({ iconUrl: `/gpxicons/geocache-found1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "geocache1": new L.Icon({ iconUrl: `/gpxicons/geocache1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "geyser": new L.Icon({ iconUrl: `/gpxicons/geyser.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "ghost-town": new L.Icon({ iconUrl: `/gpxicons/ghost-town.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "glider-area1": new L.Icon({ iconUrl: `/gpxicons/glider-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "golf-24": new L.Icon({ iconUrl: `/gpxicons/golf-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "golf-course1": new L.Icon({ iconUrl: `/gpxicons/golf-course1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "grass": new L.Icon({ iconUrl: `/gpxicons/grass.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "gray-pin": new L.Icon({ iconUrl: `/gpxicons/gray-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "green-block1": new L.Icon({ iconUrl: `/gpxicons/green-block1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "green-flag1": new L.Icon({ iconUrl: `/gpxicons/green-flag1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "green-pin": new L.Icon({ iconUrl: `/gpxicons/green-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "green-pin1": new L.Icon({ iconUrl: `/gpxicons/green-pin1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "ground-blind": new L.Icon({ iconUrl: `/gpxicons/ground-blind.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "ground-transportation1": new L.Icon({ iconUrl: `/gpxicons/ground-transportation1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "harbor-24": new L.Icon({ iconUrl: `/gpxicons/harbor-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "heart-24": new L.Icon({ iconUrl: `/gpxicons/heart-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "helipad": new L.Icon({ iconUrl: `/gpxicons/helipad.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "heliport-24": new L.Icon({ iconUrl: `/gpxicons/heliport-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "horn3": new L.Icon({ iconUrl: `/gpxicons/horn3.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "horse": new L.Icon({ iconUrl: `/gpxicons/horse.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "hospital-24": new L.Icon({ iconUrl: `/gpxicons/hospital-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "hotspring": new L.Icon({ iconUrl: `/gpxicons/hotspring.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "hunting-area1": new L.Icon({ iconUrl: `/gpxicons/hunting-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "ice-skating-area1": new L.Icon({ iconUrl: `/gpxicons/ice-skating-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "information": new L.Icon({ iconUrl: `/gpxicons/information.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "information1": new L.Icon({ iconUrl: `/gpxicons/information1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "known-route": new L.Icon({ iconUrl: `/gpxicons/known-route.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "lake": new L.Icon({ iconUrl: `/gpxicons/lake.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "light2": new L.Icon({ iconUrl: `/gpxicons/light2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "lighthouse-24": new L.Icon({ iconUrl: `/gpxicons/lighthouse-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "lodging-24": new L.Icon({ iconUrl: `/gpxicons/lodging-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "lodging3": new L.Icon({ iconUrl: `/gpxicons/lodging3.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "lodging4": new L.Icon({ iconUrl: `/gpxicons/lodging4.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "logging-24": new L.Icon({ iconUrl: `/gpxicons/logging-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "man-overboard-thumb1": new L.Icon({ iconUrl: `/gpxicons/man-overboard-thumb1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "market": new L.Icon({ iconUrl: `/gpxicons/market.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "marsh": new L.Icon({ iconUrl: `/gpxicons/marsh.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "medical-facility2": new L.Icon({ iconUrl: `/gpxicons/medical-facility2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "mine": new L.Icon({ iconUrl: `/gpxicons/mine.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "mine1": new L.Icon({ iconUrl: `/gpxicons/mine1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "minefield-24": new L.Icon({ iconUrl: `/gpxicons/minefield-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "mobilephone-24": new L.Icon({ iconUrl: `/gpxicons/mobilephone-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "moose": new L.Icon({ iconUrl: `/gpxicons/moose.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "movie-theater1": new L.Icon({ iconUrl: `/gpxicons/movie-theater1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "mud": new L.Icon({ iconUrl: `/gpxicons/mud.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "museum": new L.Icon({ iconUrl: `/gpxicons/museum.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "museum1": new L.Icon({ iconUrl: `/gpxicons/museum1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "mushroom": new L.Icon({ iconUrl: `/gpxicons/mushroom.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "natural-spring": new L.Icon({ iconUrl: `/gpxicons/natural-spring.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-amber1": new L.Icon({ iconUrl: `/gpxicons/navaid-amber1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-black1": new L.Icon({ iconUrl: `/gpxicons/navaid-black1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-blue1": new L.Icon({ iconUrl: `/gpxicons/navaid-blue1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-green-red1": new L.Icon({ iconUrl: `/gpxicons/navaid-green-red1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-green-white1": new L.Icon({ iconUrl: `/gpxicons/navaid-green-white1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-green1": new L.Icon({ iconUrl: `/gpxicons/navaid-green1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-orange1": new L.Icon({ iconUrl: `/gpxicons/navaid-orange1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-red-green1": new L.Icon({ iconUrl: `/gpxicons/navaid-red-green1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-red-white1": new L.Icon({ iconUrl: `/gpxicons/navaid-red-white1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-red1": new L.Icon({ iconUrl: `/gpxicons/navaid-red1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-violet1": new L.Icon({ iconUrl: `/gpxicons/navaid-violet1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-white-green1": new L.Icon({ iconUrl: `/gpxicons/navaid-white-green1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-white-red1": new L.Icon({ iconUrl: `/gpxicons/navaid-white-red1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "navaid-white1": new L.Icon({ iconUrl: `/gpxicons/navaid-white1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "no-admittance-1": new L.Icon({ iconUrl: `/gpxicons/no-admittance-1.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "no-admittance-2": new L.Icon({ iconUrl: `/gpxicons/no-admittance-2.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-0": new L.Icon({ iconUrl: `/gpxicons/number-0.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-1": new L.Icon({ iconUrl: `/gpxicons/number-1.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-2": new L.Icon({ iconUrl: `/gpxicons/number-2.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-3": new L.Icon({ iconUrl: `/gpxicons/number-3.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-4": new L.Icon({ iconUrl: `/gpxicons/number-4.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-5": new L.Icon({ iconUrl: `/gpxicons/number-5.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-6": new L.Icon({ iconUrl: `/gpxicons/number-6.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-7": new L.Icon({ iconUrl: `/gpxicons/number-7.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-8": new L.Icon({ iconUrl: `/gpxicons/number-8.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "number-9": new L.Icon({ iconUrl: `/gpxicons/number-9.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "off-road": new L.Icon({ iconUrl: `/gpxicons/off-road.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "oil-field1": new L.Icon({ iconUrl: `/gpxicons/oil-field1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "oil-well-24": new L.Icon({ iconUrl: `/gpxicons/oil-well-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "orange-pin": new L.Icon({ iconUrl: `/gpxicons/orange-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "parachuting-area1": new L.Icon({ iconUrl: `/gpxicons/parachuting-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "park-24": new L.Icon({ iconUrl: `/gpxicons/park-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "park1": new L.Icon({ iconUrl: `/gpxicons/park1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "parking-24": new L.Icon({ iconUrl: `/gpxicons/parking-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "parking2": new L.Icon({ iconUrl: `/gpxicons/parking2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "peak": new L.Icon({ iconUrl: `/gpxicons/peak.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "petroglyph": new L.Icon({ iconUrl: `/gpxicons/petroglyph.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "pharmacy2": new L.Icon({ iconUrl: `/gpxicons/pharmacy2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "picnic-area1": new L.Icon({ iconUrl: `/gpxicons/picnic-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "picnic": new L.Icon({ iconUrl: `/gpxicons/picnic.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "pitch-24": new L.Icon({ iconUrl: `/gpxicons/pitch-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "pizza1": new L.Icon({ iconUrl: `/gpxicons/pizza1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "playground-24": new L.Icon({ iconUrl: `/gpxicons/playground-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "police-station1": new L.Icon({ iconUrl: `/gpxicons/police-station1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "police": new L.Icon({ iconUrl: `/gpxicons/police.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "polling-place-24": new L.Icon({ iconUrl: `/gpxicons/polling-place-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "post-office1": new L.Icon({ iconUrl: `/gpxicons/post-office1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "potable-water": new L.Icon({ iconUrl: `/gpxicons/potable-water.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "prison-24": new L.Icon({ iconUrl: `/gpxicons/prison-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "purple-pin": new L.Icon({ iconUrl: `/gpxicons/purple-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "radio-beacon3": new L.Icon({ iconUrl: `/gpxicons/radio-beacon3.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "rail-24": new L.Icon({ iconUrl: `/gpxicons/rail-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "railroad": new L.Icon({ iconUrl: `/gpxicons/railroad.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "ranger-station": new L.Icon({ iconUrl: `/gpxicons/ranger-station.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "red-block1": new L.Icon({ iconUrl: `/gpxicons/red-block1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "red-flag1": new L.Icon({ iconUrl: `/gpxicons/red-flag1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "red-pin-down": new L.Icon({ iconUrl: `/gpxicons/red-pin-down.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "red-pin": new L.Icon({ iconUrl: `/gpxicons/red-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "red-pin1": new L.Icon({ iconUrl: `/gpxicons/red-pin1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "reef": new L.Icon({ iconUrl: `/gpxicons/reef.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "residence1": new L.Icon({ iconUrl: `/gpxicons/residence1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "restaurant-24": new L.Icon({ iconUrl: `/gpxicons/restaurant-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "restaurant4": new L.Icon({ iconUrl: `/gpxicons/restaurant4.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "restaurant5": new L.Icon({ iconUrl: `/gpxicons/restaurant5.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "restricted-area1": new L.Icon({ iconUrl: `/gpxicons/restricted-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "restrooms2": new L.Icon({ iconUrl: `/gpxicons/restrooms2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "resupply": new L.Icon({ iconUrl: `/gpxicons/resupply.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "ruins": new L.Icon({ iconUrl: `/gpxicons/ruins.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "rv-park": new L.Icon({ iconUrl: `/gpxicons/rv-park.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "rv-park1": new L.Icon({ iconUrl: `/gpxicons/rv-park1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "saddle": new L.Icon({ iconUrl: `/gpxicons/saddle.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "sand-dune": new L.Icon({ iconUrl: `/gpxicons/sand-dune.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "scat": new L.Icon({ iconUrl: `/gpxicons/scat.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "scenic-area1": new L.Icon({ iconUrl: `/gpxicons/scenic-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "school1": new L.Icon({ iconUrl: `/gpxicons/school1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "scrub": new L.Icon({ iconUrl: `/gpxicons/scrub.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "shelter": new L.Icon({ iconUrl: `/gpxicons/shelter.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "shipwreck1": new L.Icon({ iconUrl: `/gpxicons/shipwreck1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "shopping2": new L.Icon({ iconUrl: `/gpxicons/shopping2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "shopping3": new L.Icon({ iconUrl: `/gpxicons/shopping3.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "short-tower1": new L.Icon({ iconUrl: `/gpxicons/short-tower1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "shower": new L.Icon({ iconUrl: `/gpxicons/shower.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "shower1": new L.Icon({ iconUrl: `/gpxicons/shower1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "ski-resort1": new L.Icon({ iconUrl: `/gpxicons/ski-resort1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "skiing-24": new L.Icon({ iconUrl: `/gpxicons/skiing-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "skull-and-crossbones2": new L.Icon({ iconUrl: `/gpxicons/skull-and-crossbones2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "snowflake": new L.Icon({ iconUrl: `/gpxicons/snowflake.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "snowmobile": new L.Icon({ iconUrl: `/gpxicons/snowmobile.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "square-24": new L.Icon({ iconUrl: `/gpxicons/square-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "stadium1": new L.Icon({ iconUrl: `/gpxicons/stadium1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "star-24": new L.Icon({ iconUrl: `/gpxicons/star-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "steps": new L.Icon({ iconUrl: `/gpxicons/steps.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "stone": new L.Icon({ iconUrl: `/gpxicons/stone.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "suitcase-24": new L.Icon({ iconUrl: `/gpxicons/suitcase-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "summit1": new L.Icon({ iconUrl: `/gpxicons/summit1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "svg-export": new L.Icon({ iconUrl: `/gpxicons/svg-export.zip`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "svgexport-1": new L.Icon({ iconUrl: `/gpxicons/svgexport-1.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "svgexport-2": new L.Icon({ iconUrl: `/gpxicons/svgexport-2.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "svgexport-3": new L.Icon({ iconUrl: `/gpxicons/svgexport-3.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "svgexport-4": new L.Icon({ iconUrl: `/gpxicons/svgexport-4.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "svgexport-5": new L.Icon({ iconUrl: `/gpxicons/svgexport-5.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "swimming-24": new L.Icon({ iconUrl: `/gpxicons/swimming-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "swimming-area3": new L.Icon({ iconUrl: `/gpxicons/swimming-area3.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "tall-tower1": new L.Icon({ iconUrl: `/gpxicons/tall-tower1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "telephone1": new L.Icon({ iconUrl: `/gpxicons/telephone1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "theater1": new L.Icon({ iconUrl: `/gpxicons/theater1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "toilets-24": new L.Icon({ iconUrl: `/gpxicons/toilets-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "toll-booth1": new L.Icon({ iconUrl: `/gpxicons/toll-booth1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "towing1": new L.Icon({ iconUrl: `/gpxicons/towing1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "track-deer": new L.Icon({ iconUrl: `/gpxicons/track-deer.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "track-dog": new L.Icon({ iconUrl: `/gpxicons/track-dog.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "trail-camera": new L.Icon({ iconUrl: `/gpxicons/trail-camera.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "trail-head1": new L.Icon({ iconUrl: `/gpxicons/trail-head1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "trailhead": new L.Icon({ iconUrl: `/gpxicons/trailhead.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "trash": new L.Icon({ iconUrl: `/gpxicons/trash.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "tree-fall": new L.Icon({ iconUrl: `/gpxicons/tree-fall.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "tree-marker": new L.Icon({ iconUrl: `/gpxicons/tree-marker.png`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "tree-stand": new L.Icon({ iconUrl: `/gpxicons/tree-stand.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "triangle-24": new L.Icon({ iconUrl: `/gpxicons/triangle-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "truck-stop1": new L.Icon({ iconUrl: `/gpxicons/truck-stop1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "tunnel2": new L.Icon({ iconUrl: `/gpxicons/tunnel2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "turkey": new L.Icon({ iconUrl: `/gpxicons/turkey.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "ultralight-area1": new L.Icon({ iconUrl: `/gpxicons/ultralight-area1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "volcano": new L.Icon({ iconUrl: `/gpxicons/volcano.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "water-24": new L.Icon({ iconUrl: `/gpxicons/water-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "water-skiing-area2": new L.Icon({ iconUrl: `/gpxicons/water-skiing-area2.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "water": new L.Icon({ iconUrl: `/gpxicons/water.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "waterfall": new L.Icon({ iconUrl: `/gpxicons/waterfall.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "weigh-station1": new L.Icon({ iconUrl: `/gpxicons/weigh-station1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "wetland-24": new L.Icon({ iconUrl: `/gpxicons/wetland-24.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "white-pin": new L.Icon({ iconUrl: `/gpxicons/white-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "wood": new L.Icon({ iconUrl: `/gpxicons/wood.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "yellow-pin": new L.Icon({ iconUrl: `/gpxicons/yellow-pin.svg`, iconSize: [26, 26], popupAnchor: [0, -15]}),
    "zoo1": new L.Icon({ iconUrl: `/gpxicons/zoo1.gif`, iconSize: [26, 26], popupAnchor: [0, -15]}),
  
    getIcon: function(sym) {
      let symbolName = sym ? sym.toLowerCase().replace(/ /,"-") : "default";
      let symbol = this[symbolName];
      if ( !symbol ) {
        Object.keys(this).forEach(function(key,index) {
          if( key.startsWith(symbolName) ) {
            symbolName = key;
          }
        });
        symbol = this[symbolName];
      }
      return symbol || this["default"];
    }
  }
}

const TrackCard = ({ track }) => {
  const stroke = track.properties.stroke || '8B0000';
  const strokeColor = `#${stroke}`
  return (
      <div className="row g-2 align-items-center" >
            <div className="col-md-2 g-3" style={{backgroundColor: strokeColor}}>
              &nbsp;
            </div>
            <div className="col-md-10">
              <div className="wpt-cmt mb-1"><b>{track.properties.name}</b></div>
              {track.properties.desc && <p className="card-text"><ReactMarkdown rehypePlugins={[rehypeRaw]}>{track.properties.desc}</ReactMarkdown></p>}
              {track.properties.time && <p className="card-text"><small className="text-muted">{track.properties.time}</small></p>}
            </div>
      </div>
)}

const WaypointCard = ({ waypoint }) => {
  const symbol = iconCollection.getIcon(waypoint.properties.sym);
  const image = symbol && symbol.options && symbol.options.iconUrl;
  const elevation = JSON.stringify(waypoint.geometry.coordinates.length === 3 ? waypoint.geometry.coordinates[2] : undefined); 
  return (
      <div className="row g-2 align-items-center">
          <div className="col-md-2">
              <img width="24" src={image} alt={waypoint.properties.sym}/>
          </div>
          <div className="col-md-10">
              <div className="wpt-cmt mb-1"><b>{waypoint.properties.name}</b></div>
              <div className="wpt-cmt">{waypoint.properties.desc}</div>
              <div className="wpt-cmt mt-1">{waypoint.geometry.coordinates[1]}, {waypoint.geometry.coordinates[0]} {elevation && <span>({elevation})</span>}</div>
          </div>
      </div>
)}

const GpxCard = ({ name, link, type }) => {
  return (
            <div className="card-body">
                <Link className="text-decoration-none link-dark stretched-link" to={link}>
                  { type === "tag" && <FaTag/> }
                  { type === "file" && <FaFile/> }
                  { type === "folder" && <FaFolder/> }
                  &nbsp;
                  {name.replace(/_/g," ")}
                </Link>
            </div>
)}

const WaypointMarker = ({ waypoint }) => {
    const symbol = iconCollection.getIcon(waypoint.properties.sym);
    return (
        <Marker icon={symbol} position={[waypoint.geometry.coordinates[1], waypoint.geometry.coordinates[0]]} >
            <Popup minWidth="150">
                <WaypointCard waypoint={waypoint}/>
            </Popup>
        </Marker>
    )
}

const TrackLine = ({track}) => {
    const stroke = track.properties.stroke || '8B0000';
    const strokeColor = `#${stroke}`
    return (
        <Polyline
	          pathOptions={{ fillColor: 'blue', color: strokeColor }}
	          positions={track.geometry.coordinates.map( p => [p[1], p[0]]) }
        />
    )
}

export { TrackCard, TrackLine, WaypointCard, GpxCard, WaypointMarker }
