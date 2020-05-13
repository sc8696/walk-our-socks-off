import React, { useEffect, useRef, useState } from "react";

import { MapAnimator } from "./map-animator";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import poi from "./map-data/poi";
import route from "./map-data/route";
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
  zoom: 5
};

const setupMap = element => {
  return new mapboxgl.Map({
    container: element,
    style: customMapStyle
  });
};

const Map = ({ characters, drawRoute }) => {
  const [map, setMap] = useState(null);
  const mapElement = useRef(null);
  const characterArray = Object.values(characters);

  useEffect(() => {
    if (!map && mapElement.current) {
      console.debug(map, mapElement);
      const m = setupMap(mapElement.current);
      m.on("load", () => {
        setMap(m);
      });
    } else if (map && drawRoute) {
      new MapAnimator(map, {
        characterOne: characterArray[0],
        characterTwo: characterArray[1],
        route,
        places: poi
      }).animate();
    }
  }, [map, drawRoute]);

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <div
        ref={mapElement}
        className={styles.mapContainer}
        role="presentation"
        aria-hidden="true"
      ></div>
    </>
  );
};

Map.propTypes = {
  characters: PropTypes.object,
  drawRoute: PropTypes.bool
};

export default Map;
