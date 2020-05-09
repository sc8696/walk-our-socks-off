import React from "react"
import ReactMapboxGl from "react-mapbox-gl"
import styles from "./map.module.scss"

const MapBox = ReactMapboxGl({
  accessToken: "it-doesn't-matter"
})

const tileServer =
  "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"

const customMapStyle = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: [tileServer],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "simple-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 22,
    },
  ],
}

const Map = () => {
  return (
    <div className={styles.mapContainer} role="presentation" aria-hidden="true">
      <MapBox
        style={customMapStyle}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
      ></MapBox>
    </div>
  )
}

Map.propTypes = {}

export default Map
