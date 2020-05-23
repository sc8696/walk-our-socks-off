import { along, length, lineString } from "@turf/turf";

import mapboxgl from "mapbox-gl";

import { noop } from "lodash";

import { renderToString } from "react-dom/server";

function precalcAnimationSteps(
  route,
  routeLength,
  distanceTravelled,
  stepDistance
) {
  let travelled = 0;
  const frames = [
    along(route, 0, {
      units: "kilometers"
    })
  ];
  while ((travelled += stepDistance) < distanceTravelled) {
    if (travelled < routeLength) {
      frames.push(
        along(route, travelled, {
          units: "kilometers"
        })
      );
    }
  }
  return frames;
}

function initialiseMarkers(map, characterOne, characterTwo) {
  try {
    var initial = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [[0, 0]]
          }
        }
      ]
    };

    [characterOne, characterTwo].forEach((character, idx) => {
      map.addSource(character.id, {
        type: "geojson",
        data: initial
      });

      map.addLayer({
        id: character.id,
        type: "line",
        source: character.id,
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": character.colour,
          "line-width": 6,
          "line-translate": [0, -6 * idx]
        }
      });
    });
  } catch (e) {
    console.error(e);
  }
}

function getStartLabel(character, point, startMarkerClass, style = {}) {
  // create label elements for Sarah & Lucy start points
  var homeContainer = document.createElement("div");
  var home = document.createElement("div");
  homeContainer.append(home);
  home.className = startMarkerClass;
  Object.assign(home.style, style);
  home.innerText = `${character.name}'s home`;

  const marker = new mapboxgl.Marker(homeContainer);
  return marker.setLngLat(point);
}

function getMarker(character, point, className) {
  const avatar = document.createElement("div");
  const transitionContainer = document.createElement("div");
  avatar.className = className;
  avatar.innerHTML = renderToString(character.marker);
  transitionContainer.append(avatar);

  return new mapboxgl.Marker(transitionContainer).setLngLat(point);
}

/**
 *
 *
 * @export
 * @class MapCanvas
 */
export class MapCanvas {
  constructor(
    map,
    { characterOne, characterTwo, route, places } = {},
    classNames
  ) {
    this.map = map;
    this.route = route;
    this.routeLength = length(route);
    this.reversedRoute = {
      ...this.route,
      coordinates: [...this.route.coordinates].reverse()
    };
    this.classNames = classNames;
    this.places = places;
    this.characterOne = characterOne;
    this.characterTwo = characterTwo;
    this.characterFrameTimer = {};
    this.targetFrameRate = 60;
    this.targetFrameTime = (1000 / 60) * (60 / this.targetFrameRate);
    const startPoint = route.coordinates[0];
    const endPoint = route.coordinates[route.coordinates.length - 1];
    const characterList = [characterOne, characterTwo];

    this.bounds = [startPoint, endPoint];

    initialiseMarkers(this.map, ...characterList);

    characterList.forEach((character, idx) => {
      const point = idx === 0 ? startPoint : endPoint;
      getStartLabel(character, point, classNames.startMarkerClass, {
        backgroundColor: character.colour,
        transform: idx === 0 ? "translateY(-100%)" : "translateY(100%)"
      }).addTo(this.map);
    });
  }
  _drawAnimatedRouteAndMarker(frameSet, marker, id, onFinish) {
    requestAnimationFrame(timestamp => {
      this.characterFrameTimer[id] = timestamp;
      this._animateMarker(
        timestamp,
        id,
        0,
        frameSet,
        marker,
        [],
        frameSet.length - 1,
        onFinish
      );
    });
  }

  // update the route data the specified distance along the line
  _drawRouteProgress(lineSegment, id) {
    this.map.getSource(id).setData(lineSegment);
  }

  _animateMarker(
    time,
    id,
    frameNumber,
    frameSet,
    marker,
    lineSegment,
    finalFrameNumber,
    onFinish
  ) {
    const lastFrameTime = time - this.characterFrameTimer[id];
    const framesToSkip = Math.ceil(lastFrameTime / this.targetFrameTime);
    const nextFrameNumber = frameNumber + framesToSkip;
    const nextFrame = timestamp =>
      this._animateMarker(
        timestamp,
        id,
        nextFrameNumber,
        frameSet,
        marker,
        lineSegment,
        finalFrameNumber,
        onFinish
      );

    this.characterFrameTimer[id] = time;
    const thisPoint = frameSet[nextFrameNumber]?.geometry?.coordinates ?? null;

    if (nextFrameNumber <= finalFrameNumber) {
      marker.setLngLat(thisPoint);

      lineSegment.push(thisPoint);
      if (lineSegment.length > 1) {
        this._drawRouteProgress(lineString(lineSegment), id);
      }

      if (thisPoint) {
        // Request the next frame of the animation until distance is reached
        requestAnimationFrame(nextFrame);
      }
    } else {
      onFinish(marker);
    }
  }

  initialise() {
    this.characterOneMarker = getMarker(
      this.characterOne,
      this.route.coordinates[0],
      this.classNames.characterMarkerClass
    ).addTo(this.map);
    this.characterTwoMarker = getMarker(
      this.characterTwo,
      this.reversedRoute.coordinates[0],
      this.classNames.characterMarkerClass
    ).addTo(this.map);
    return this;
  }

  animate(
    { stepDistance = 0.1 } = {},
    onCharacterOneFinish = noop,
    onCharacterTwoFinish = noop
  ) {
    if (!this.characterOneMarker || !this.characterTwoMarker) {
      this.initialise();
    }
    const characterOneRouteFrames = precalcAnimationSteps(
      this.route,
      this.routeLength,
      this.characterOne.distanceTravelled,
      stepDistance
    );
    const characterTwoRouteFrames = precalcAnimationSteps(
      this.reversedRoute,
      this.routeLength,
      this.characterTwo.distanceTravelled,
      stepDistance
    );

    // animate route progressing with marker for Sarah
    this._drawAnimatedRouteAndMarker(
      characterOneRouteFrames,
      this.characterOneMarker,
      this.characterOne.id,
      onCharacterOneFinish
    );

    // animate route progressing with marker for Sarah
    this._drawAnimatedRouteAndMarker(
      characterTwoRouteFrames,
      this.characterTwoMarker,
      this.characterTwo.id,
      onCharacterTwoFinish
    );
    return this;
  }
}
