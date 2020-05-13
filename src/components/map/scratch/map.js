const sarah = {
  name: "Sarah",
  startlocation: "Cheltenham",
  className: "sarah"
};

const lucy = {
  name: "Lucy",
  startlocation: "Clacton-on-Sea",
  className: "lucy"
};

async function getRoute() {
  const route = await fetch("./route.json");
  return route.json();
}

async function getPlaces() {
  const places = await fetch("./places.json");
  return places.json();
}

// I'm sorry!
function drawAnimatedRouteAndMarker(
  route,
  distance,
  person,
  places,
  reverse = false
) {
  // find the position along route
  let line = turf.lineString(route);

  console.log(line);

  if (reverse) {
    line.geometry.coordinates.reverse();
  }

  var options = { units: "kilometers" };
  var alongDistance = distance;

  var along = turf.along(line, alongDistance, options);

  //create a HTML element for custom marker
  var el = document.createElement("div");
  el.className = "marker " + person.className;

  // place the marker
  var marker = new mapboxgl.Marker(el)
    .setLngLat(along.geometry.coordinates)
    .addTo(map);

  requestAnimationFrame(() => {
    animateMarker(1, marker, line, options, distance, person, places);
  });
}

function animateMarker(frame, marker, line, options, distance, person, places) {
  // how far to move each frame in kms
  var stepdistance = 0.15;

  // new distance along line
  var alongDistance = frame * stepdistance;

  // new position along line
  var along = turf.along(line, alongDistance, options);

  marker.setLngLat(along.geometry.coordinates).addTo(map);
  drawRouteProgress(line, alongDistance, person.className);

  // Request the next frame of the animation until distance is reached
  if (alongDistance < distance) {
    requestAnimationFrame(() => {
      animateMarker(++frame, marker, line, options, distance, person, places);
    });
  } else {
    addPopup(marker, person, distance, places, along);
  }
}

// update the route data the specified distance along the line
function drawRouteProgress(line, distance, id) {
  let segment = turf.lineSliceAlong(line, 0, distance, {
    units: "kilometers"
  });

  map.getSource(id).setData(segment);
}

function addPopup(marker, person, distance, places, along) {
  // find the nearest place to marker coordinates
  var targetpoint = along;
  var nearest = turf.nearestPoint(targetpoint, places.places[0].data);

  var feature = nearest;

  var caption =
    "On her virtual journey " +
    person.name +
    ' would now be near <a href= "' +
    feature.properties.link +
    '">' +
    feature.properties.placeName +
    "</a>, " +
    distance +
    " kilometres from her start point in " +
    person.startlocation +
    ".";

  var popupContent =
    '<div id="' +
    feature.properties.placeName +
    '" class="popup">' +
    '<div class = "image"><img src="' +
    feature.properties.image.url +
    '"/></div></div><div class = "caption">' +
    caption +
    "</div>";

  var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 30 })
    // .setLngLat(point)
    .setHTML(popupContent);

  // attaches popup to marker for position & interactions
  marker.setPopup(popup);

  // displays popup as open initially
  popup.addTo(map);
}

function placeStartLabels(route) {
  // create label elements for Sarah & Lucy start points
  var s_home_container = document.createElement("div");
  var s_home = document.createElement("div");
  s_home_container.append(s_home);
  s_home.className = "start-marker sarah";
  s_home.innerText = "Sarah home";

  var l_home_container = document.createElement("div");
  var l_home = document.createElement("div");
  l_home_container.append(l_home);
  l_home.className = "start-marker lucy";
  l_home.innerText = "Lucy home";

  // place as markers on the map, using start and end points of the route
  var marker = new mapboxgl.Marker(s_home_container)
    .setLngLat(route[0])
    .addTo(map);
  var marker = new mapboxgl.Marker(l_home_container)
    .setLngLat(route[route.length - 1])
    .addTo(map);
}

// set styles, and data sources for Sarah & Lucy routes.
function initialiseRoutes() {
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
  map.addSource("sarah", {
    type: "geojson",
    data: initial
  });

  map.addLayer({
    id: "sarah",
    type: "line",
    source: "sarah",
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "#FF715B",
      "line-width": 6,
      "line-translate": [0, -6]
    }
  });

  map.addSource("lucy", {
    type: "geojson",
    data: initial
  });

  map.addLayer({
    id: "lucy",
    type: "line",
    source: "lucy",
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "#0FA3B1",
      "line-width": 6,
      "line-translate": [0, 0]
    }
  });
}

(async function main() {
  const route = await getRoute();
  const distances = await getDistances();
  const places = await getPlaces();

  initialiseRoutes();

  // place markers for start labels
  placeStartLabels(route.routes[0].geometry.coordinates);

  // animate route progressing with marker for Sarah
  drawAnimatedRouteAndMarker(
    [...route.routes[0].geometry.coordinates],
    distances[0],
    sarah,
    places
  );

  // animate route progresssing with marker for Lucy
  drawAnimatedRouteAndMarker(
    [...route.routes[0].geometry.coordinates],
    distances[1],
    lucy,
    places,
    true
  );
})();
