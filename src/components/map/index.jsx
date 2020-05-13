import React, { useEffect, useRef, useState } from "react";
import { along, nearestPoint } from "@turf/turf";

import { MapCanvas } from "./map-canvas";
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

const getEndpointDescription = (person, endPlace) => {
  return (
    <p>
      On her virtual journey {person.name} would now be near{" "}
      <a href={endPlace.properties.link}>{endPlace.properties.placeName}</a>,
      {person.distanceTravelled} kilometers from her start point in{" "}
      {person.home}
    </p>
  );
};

const getEndPointPopup = (person, endPlace) => {
  const { image } = endPlace.properties;
  return (
    <div className={styles.endPointPopup}>
      {getEndpointDescription(person, endPlace)}
      <img
        src={image.url}
        alt={image.description}
        title={image.attribution}
        aria-label={image.description}
      />
    </div>
  );
};

const Map = ({ characters, drawRoute }) => {
  const [map, setMap] = useState(null);
  const mapElement = useRef(null);
  const characterArray = Object.values(characters);

  const characterOne = characterArray[0];
  const characterTwo = characterArray[1];
  const characterOneCurrentPoint = along(
    route,
    characterOne.distanceTravelled,
    { units: "kilometers" }
  );
  const characterTwoCurrentPoint = along(
    route,
    characterTwo.distanceTravelled,
    { units: "kilometers" }
  );
  const characterOneNearestPlace = nearestPoint(
    characterOneCurrentPoint,
    poi.places[0].data
  );
  const characterTwoNearestPlace = nearestPoint(
    characterTwoCurrentPoint,
    poi.places[0].data
  );

  const characterOneEndPointPopup = getEndPointPopup(
    characterOne,
    characterOneNearestPlace
  );
  const characterTwoEndPointPopup = getEndPointPopup(
    characterTwo,
    characterTwoNearestPlace
  );

  useEffect(() => {
    if (!map && mapElement.current) {
      const m = setupMap(mapElement.current);
      m.on("load", () => {
        setMap(m);
      });
    } else if (map && drawRoute) {
      new MapCanvas(
        map,
        {
          characterOne,
          characterTwo,
          route,
          places: poi
        },
        {
          startMarkerClass: styles.startMarker
        }
      ).animate(
        {
          stepDistance: 10
        },
        characterOneMarker => {
          const popup = new mapboxgl.Popup({
            closeOnClick: false,
            offset: 30
          }).setHTML(characterOneEndPointPopup);
          characterOneMarker.setPopup(popup);
          popup.addTo(map);
        },
        characterTwoMarker => {
          const popup = new mapboxgl.Popup({
            closeOnClick: false,
            offset: 30
          }).setHTML(characterOneEndPointPopup);
          characterTwoMarker.setPopup(popup);
          popup.addTo(map);
        }
      );
    }
  }, [map, drawRoute]);

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <figure ref={mapElement} className={styles.mapContainer}>
        <figcaption className={styles.mapDescriptions}>
          {getEndpointDescription(characterOne, characterOneNearestPlace)}
          {getEndpointDescription(characterTwo, characterTwoNearestPlace)}
        </figcaption>
      </figure>
    </>
  );
};

Map.propTypes = {
  characters: PropTypes.object,
  drawRoute: PropTypes.bool
};

export default Map;
