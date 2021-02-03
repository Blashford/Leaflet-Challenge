var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 8
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

var geoJson;

function markerSize(magnitude) {
    return magnitude * 500
} 
function colorFill(depth) {
    if 
}
d3.json(link).then(function(data){
    console.log(data)
    
    geojson = L.choropleth(data, {
        // Define what  property in the features to use
        // valueProperty: `${geometry[coordinates][2]}`,
        // // Set color scale
        // scale: ["#ffffb2", "#b10026"],
        // // Number of breaks in step range
        // steps: 10,
        // // q for quartile, e for equidistant, k for k-means
        // mode: "q",
        // style: {
        //   // Border color
        //   color: "#fff",
        //   weight: 1,
        //   fillOpacity: 0.8
        // },
        onEachFeature: function(feature, layer) {
        var coord = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        var depth = feature.geometry.coordinates[2];
        var magnitude = feature.properties.mag
        L.circle(coord, {
            fillOpacity:0.75,
            color: "black",
            fillColor: "blue",
            radius: markerSize(magnitude)
        }).addTo(myMap)
        
    }})
        //})
})