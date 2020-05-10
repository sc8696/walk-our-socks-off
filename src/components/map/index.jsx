import React from "react";
import mapboxgl from "mapbox-gl";
import styles from "./map.module.scss";

const tileServer =
  "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg";

const customMapStyle = {
  version: 8,
  sources: {
    "raster-tiles": {
      type: "raster",
      tiles: [tileServer],
      tileSize: 256
    }
  },
  layers: [
    {
      id: "simple-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 22
    }
  ],
  center: [-0.389284868409795, 51.96030424936522],
  zoom: 8
};

const Map = () => {
  const setupMap = element => {
    if (element) {
      new mapboxgl.Map({
        container: element,
        style: customMapStyle
      });
    }
  };

  return (
    <div
      ref={el => setupMap(el)}
      className={styles.mapContainer}
      role="presentation"
      aria-hidden="true"
    ></div>
  );
};

Map.propTypes = {};

export default Map;
