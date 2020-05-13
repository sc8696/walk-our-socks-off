import mapboxgl from "mapbox-gl";
import { noop } from "lodash";

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
  const markerElement = document.createElement("div");
  markerElement.innerHTML = character.avatar;
  return new mapboxgl.Marker(markerElement).setLngLat(point);
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
  animate(
    { stepDistance = 1 } = {},
    onCharacterOneFinish = noop,
    onCharacterTwoFinish = noop
  ) {
    /** Animate in to the bounds */
    this.map.fitBounds(this.bounds, { padding: 50 });
  }
}
