var myMap = L.map("map", {
    center: [40.7128, -115.0059],
    zoom: 6
  });


  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function markerSize(magnitude) {
    return magnitude * 10000
} 

function colorFill(depth){
    if (depth <= 10) {
        return "#45f200"
    }
    else if (depth <= 30) {
        return "#a1f200"
    }
    else if (depth <= 50) {
        return "#eff542"
    }
    else if (depth <= 70) {
        return "#fccb05"
    }
    else if (depth <= 90) {
        return "#f58607"
    }
    else {
        return "#ff0808"
    }
}

var geojson;

d3.json(link).then(function(data){
    console.log(data)
    
    geojson = L.choropleth(data, {
        // Define what  property in the features to use
        valueProperty: data.features[0].geometry.coordinates[2],
        // Set color scale
        scale: ["#45f200", "#a1f200", "#eff542", "#fccb05", "#f58607", "#ff0808"],
        // Number of breaks in step range
        steps: 6,
        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },
        onEachFeature: function(feature, layer) {
        var coord = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        var depth = feature.geometry.coordinates[2];
        var magnitude = feature.properties.mag
        L.circle(coord, {
            fillOpacity:0.75,
            color: "black",
            fillColor: colorFill(depth),
            weight: 0.5,
            radius: markerSize(magnitude)
        }).bindPopup(`<p> Magnitude: ${magnitude}</p>`).addTo(myMap)
        
    }})
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        var limits = [">10", "10-30", "30-50", "50-70", "70-90", "<90"];
        var colors = geojson.options.colors;
        var labels = []

        limits.forEach((d, i) => {
            labels.push(`<li style="list-style-type: none; margin-right: 30px;"><svg width="10" height="10"><rect width="10" height="10" style="fill:${colors[i]}"/></svg> ${d}</li>`)
        })

        div.innerHTML += `<p style="text-align:center; margin-bottom: -10px"><strong>Depth</strong></p> <ul>${labels.join("")}</ul>`;
        return div;
    };

  // Adding legend to the map
  legend.addTo(myMap);
})