import { useMap } from "react-leaflet"
import { useEffect } from "react"

const UpdateMapViewportLogic = ({ geoJsonKey, groupRef }) => {
  // Access the map context with the useMap hook
  const map = useMap()

  const updateMapPosition = () => {
    if (map && groupRef.current) {
      const layer = groupRef.current
      if (layer && layer.getBounds().isValid()) {
        map.fitBounds(layer.getBounds())
      }
    }
  }

  // useEffect Hook to reset viewport when geoJson changes
  useEffect(() => {
    updateMapPosition()
  }, [geoJsonKey]) //eslint-disable-line

  return null
}

export default UpdateMapViewportLogic
