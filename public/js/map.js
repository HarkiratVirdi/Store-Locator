mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFya2lyYXRzaW5naHZpcmRpIiwiYSI6ImNrazIxd2JobTB3d3EydnQxczd6cWp6cmcifQ.QoxRNRFF46cjlcZ1yz61jg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 11,
  center: [-79.786343, 43.7206],
});

//fetch stores

async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();
  console.log(data);
  const stores = data.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1],
        ],
      },
      properties: { storeId: store.storeId, icon: "shop" },
    };
  });

  loadMap(stores);
}

function loadMap(stores) {
  map.on("load", function () {
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: stores,
        // features: [
        //   {
        //     type: "Feature",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [-79.78132, 43.7142],
        //     },
        //     properties: { storeId: "0001", icon: "shop" },
        //   },
        // ],
      },
    });
    map.addLayer({
      id: "points",
      type: "symbol",
      source: "point",
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}
getStores();
