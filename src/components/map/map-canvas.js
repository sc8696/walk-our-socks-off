import { along, lineString, reverse } from "@turf/turf";

import mapboxgl from "mapbox-gl";

import { noop } from "lodash";

import { renderToString } from "react-dom/server";

function precalcAnimationSteps(route, routeLength, stepDistance) {
  let travelled = 0;
  const frames = [
    along(route, 0, {
      units: "kilometers"
    })
  ];
  while ((travelled += stepDistance) < routeLength) {
    frames.push(
      along(route, travelled, {
        units: "kilometers"
      })
    );
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

function getMarker(character, point) {
  const avatar = document.createElement("div");
  avatar.className = "marker";
  avatar.innerHTML = renderToString(character.marker);

  return new mapboxgl.Marker(avatar).setLngLat(point);
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
    { startMarkerClass } = {}
  ) {
    this.map = map;
    this.route = route;
    this.reversedRoute = {
      ...this.route,
      coordinates: [...this.route.coordinates].reverse()
    };
    this.places = places;
    this.characterOne = characterOne;
    this.characterTwo = characterTwo;
    const startPoint = route.coordinates[0];
    const endPoint = route.coordinates[route.coordinates.length - 1];
    const characterList = [characterOne, characterTwo];

    this.bounds = [startPoint, endPoint];

    initialiseMarkers(this.map, ...characterList);

    characterList.forEach((character, idx) => {
      const point = idx === 0 ? startPoint : endPoint;
      getStartLabel(character, point, startMarkerClass, {
        backgroundColor: character.colour,
        transform: idx === 0 ? "translateY(-100%)" : "translateY(100%)"
      }).addTo(this.map);
    });
  }
  drawAnimatedRouteAndMarker(frameSet, marker, id) {
    requestAnimationFrame(() => {
      this.animateMarker(id, 1, frameSet, marker, [], frameSet.length - 1);
    });
  }

  // update the route data the specified distance along the line
  drawRouteProgress(lineSegment, id) {
    this.map.getSource(id).setData(lineSegment);
  }

  animateMarker(
    id,
    frameNumber,
    frameSet,
    marker,
    lineSegment,
    endFrameNumber
  ) {
    const thisPoint = frameSet[frameNumber].geometry.coordinates;
    marker.setLngLat(thisPoint);

    lineSegment.push(thisPoint);
    if (lineSegment.length > 1) {
      this.drawRouteProgress(lineString(lineSegment), id);
    }

    // Request the next frame of the animation until distance is reached
    if (frameNumber < endFrameNumber) {
      requestAnimationFrame(() => {
        this.animateMarker(
          id,
          ++frameNumber,
          frameSet,
          marker,
          lineSegment,
          endFrameNumber
        );
      });
    }
  }

  animate(
    { stepDistance = 1 } = {},
    onCharacterOneFinish = noop,
    onCharacterTwoFinish = noop
  ) {
    /** Animate in to the bounds */
    this.map.fitBounds(this.bounds, { padding: 50 });

    this.routeSteps = this.route.coordinates.map((step, idx) =>
      along(this.route, idx * 0.15, {
        units: "kilometers"
      })
    );

    const characterOneMarker = getMarker(
      this.characterOne,
      this.route.coordinates[0]
    ).addTo(this.map);
    const characterTwoMarker = getMarker(
      this.characterTwo,
      this.reversedRoute.coordinates[0]
    ).addTo(this.map);

    const characterOneRouteFrames = precalcAnimationSteps(
      this.route,
      this.characterOne.distanceTravelled,
      0.333
    );
    const characterTwoRouteFrames = precalcAnimationSteps(
      this.reversedRoute,
      this.characterTwo.distanceTravelled,
      0.333
    );

    // place markers for start labels
    // animate route progressing with marker for Sarah
    this.drawAnimatedRouteAndMarker(
      characterOneRouteFrames,
      characterOneMarker,
      this.characterOne.id
    );
    this.drawAnimatedRouteAndMarker(
      characterTwoRouteFrames,
      characterTwoMarker,
      this.characterTwo.id
    );
  }
}
