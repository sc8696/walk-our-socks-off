import React, { useEffect, useRef, useState } from "react";
import { along, nearestPoint } from "@turf/turf";

import { MapCanvas } from "./map-canvas";
import MapIcon from "./../../images/map.svg";
import PropTypes from "prop-types";
import classnames from "classnames";
import mapboxgl from "mapbox-gl";
import poi from "./map-data/poi";
import { renderToString } from "react-dom/server";
import route from "./map-data/route";
import styles from "./map.module.scss";
import uuid from "uuid";

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
  zoom: 10
};

const setupMap = element => {
  return new mapboxgl.Map({
    container: element,
    style: customMapStyle,
    maxZoom: 22,
    minZoom: 5,
    center: [-0.389284868409795, 51.96030424936522],
    pitch: 25,
    interactive: false
  });
};

const getEndpointDescription = (person, endPlace) => {
  return (
    <>
      On her virtual journey {person.name} would now be near{" "}
      <a href={endPlace.properties.link}>{endPlace.properties.placeName}</a>,{" "}
      {person.distanceTravelled} kilometers from her start point in{" "}
      {person.home}
    </>
  );
};

const getEndPointPopup = (person, endPlace) => {
  const { properties } = endPlace;
  const { image } = properties;
  return (
    <div className={styles.endPointPopupContainer}>
      <p>{getEndpointDescription(person, endPlace)}</p>
      <div className={styles.imageContainer}>
        <img
          src={image.url}
          alt={`Here, she might see ${image.description}`}
          title={`A view from ${properties.placeName}\n\n${image.attribution}`}
        />
      </div>
    </div>
  );
};

const mapDescriptionUUID = uuid();

const Map = React.memo(({ characters, drawRoute }) => {
  const [map, setMap] = useState(null);
  const [mapCanvas, setMapCanvas] = useState(null);

  const mapElement = useRef(null);
  const characterArray = Object.values(characters);
  const mapIsLoading = !map;
  const characterOne = characterArray[0];
  const characterTwo = characterArray[1];
  const characterOneCurrentPoint = along(
    route,
    characterOne.distanceTravelled,
    { units: "kilometers" }
  );
  const characterTwoCurrentPoint = along(
    { ...route, coordinates: [...route.coordinates].reverse() },
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
    if (!map) {
      if (mapElement.current) {
        const m = setupMap(mapElement.current);
        m.once("load", () => {
          setMap(m);
          const mc = new MapCanvas(
            m,
            {
              characterOne,
              characterTwo,
              route,
              places: poi
            },
            {
              startMarkerClass: styles.startMarker,
              characterMarkerClass: styles.characterMarker
            }
          );
          m.once("moveend", () => {
            setMapCanvas(mc);
          });
          /** Animate in to the bounds */
          m.fitBounds(
            [
              route.coordinates[0],
              route.coordinates[route.coordinates.length - 1]
            ],
            { padding: 70 }
          );
        });
      }
    }
  }, [map]);

  useEffect(() => {
    if (mapCanvas && drawRoute) {
      /** Place the markers, let them pop in, then start drawing them */
      mapCanvas.initialise();
      setTimeout(() => {
        mapCanvas.animate(
          {
            stepDistance: 0.333
          },
          characterOneMarker => {
            const popup = new mapboxgl.Popup({
              closeOnClick: false,
              offset: 30,
              className: styles.endPointPopup,
              anchor: "top"
            }).setHTML(renderToString(characterOneEndPointPopup));
            characterOneMarker.setPopup(popup);
            popup.addTo(map);
          },
          characterTwoMarker => {
            const popup = new mapboxgl.Popup({
              closeOnClick: false,
              offset: 30,
              className: styles.endPointPopup,
              anchor: "bottom"
            }).setHTML(renderToString(characterTwoEndPointPopup));
            characterTwoMarker.setPopup(popup);
            popup.addTo(map);
          }
        );
      }, 666);
    }
  }, [mapCanvas, drawRoute]);

  return (
    <>
      <figure
        className={styles.mapContainer}
        aria-describedby={mapDescriptionUUID}
      >
        <div
          className={classnames(styles.map, {
            [styles.loading]: mapIsLoading
          })}
          ref={mapElement}
          role="presentation"
          aria-hidden="true"
        ></div>
        {mapIsLoading && (
          <div className={styles.loadingMessage}>
            <div className={styles.loadingIconContainer}>
              <MapIcon role="presentation" className={styles.loadingIcon} />
            </div>
            <p role="status">Loading Map</p>
          </div>
        )}
        <figcaption className={styles.mapDescriptions} id={mapDescriptionUUID}>
          {characterOneEndPointPopup}
          {characterTwoEndPointPopup}
        </figcaption>
      </figure>
    </>
  );
});

Map.propTypes = {
  characters: PropTypes.object,
  drawRoute: PropTypes.bool
};

export default Map;
