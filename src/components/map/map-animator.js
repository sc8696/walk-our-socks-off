import mapboxgl from "mapbox-gl";

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

function getStartLabels(characterOne, characterTwo, route, startMarkerClass) {
  return [characterOne, characterTwo].map((character, idx) => {
    // create label elements for Sarah & Lucy start points
    var homeContainer = document.createElement("div");
    var home = document.createElement("div");
    homeContainer.append(home);
    home.className = startMarkerClass;
    home.style.backgroundColor = character.colour;
    home.innerText = `${character.name}'s home`;

    const marker = new mapboxgl.Marker(homeContainer);

    if (idx === 0) {
      return marker.setLngLat(route[0]);
    }
    return marker.setLngLat(route[route.length - 1]);
  });
}

/**
 *
 *
 * @export
 * @class MapAnimator
 */
export class MapAnimator {
  constructor(
    map,
    { characterOne, characterTwo, route, places } = {},
    { startMarkerClass } = {}
  ) {
    this.map = map;
    initialiseMarkers(this.map, characterOne, characterTwo);
    getStartLabels(characterOne, characterTwo, route, startMarkerClass).forEach(
      label => {
        label.addTo(this.map);
      }
    );
  }
  animate() {
    this.map.fitBounds([
      [1.8204186006650787, 52.5354502581409],
      [-2.7525925889576683, 51.30057680750892]
    ]);
  }
}
