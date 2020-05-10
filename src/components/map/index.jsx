import React, { useState } from "react";

import { DrawStuffOnMap } from "./draw";
import PropTypes from "prop-types";
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

const Map = ({ characters }) => {
  const [mapBox, setMapBox] = useState(null);
  const setupMap = element => {
    if (element && !mapBox) {
      const map = new mapboxgl.Map({
        container: element,
        style: customMapStyle
      });
      setMapBox(map);

      DrawStuffOnMap(map, characters);
    }
  };

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <div
        ref={el => setupMap(el)}
        className={styles.mapContainer}
        role="presentation"
        aria-hidden="true"
      ></div>
    </>
  );
};

Map.propTypes = {
  characters: PropTypes.object
};

export default Map;
