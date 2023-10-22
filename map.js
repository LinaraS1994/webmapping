// We define the specific names to the values displayed in data
var LandUsenames = {
    '01': 'One & Two Family Buildings',
    '02': 'Multy Family Buildings',
    '03': 'Multy Family Buildings',
    '04': 'Mixed Residential & Commercial Buildings',
    '05': 'Commercial & Office Buildings',
    '06': 'Industrial & Manufacturing',
    '07': 'Transportation & Utiity',
    '08': 'Public Facilities & Institutions',
    '09': 'Open Space & Outdoor Recreation',
    '10': 'Parking facilities',
    '11': 'Vacant Land'
}
//Here we control the overall map features: zoom, where is map comes from, center of the map etc.
mapboxgl.accessToken = 'pk.eyJ1IjoibGluYXJhczE5OTQiLCJhIjoiY2w0czN6d2xoMDd2YTNsdWEycG9oOW41aCJ9.sZO1S1n5_4c4Iom1T_s2Cw';
        const map = new mapboxgl.Map({
          container: 'map', // container ID
          // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          style: 'mapbox://styles/linaras1994/clnyw6x5w008u01p681bj5qha', // style URL
          center: [-73.989,40.729], // starting position [lng, lat]
          zoom: 13, // starting zoom
          minZoom: 13,
          maxZoom: 18
        });

// Here we add the map navigation from Mapbox api
var nav = new mapboxgl.NavigationControl();
map.addControl (nav, 'top-left');

// Now we gonna change the cursor style while moving out of map layers
map.on ('mousemove', function(event) {
    if (map.loaded()) {
        var features = map.queryRenderedFeatures(event.point, {layers: ['land-use-mn']});
        /*if (features.length) {
            map.getCanvas().style.cursor = 'pointer';
        } else {
            map.getCanvas().style.cursor = '';
        }*/
        map.getCanvas().style.cursor = features.length ? 'pointer' : ''; /* this is an another way to write the condition statement*/
    }   
});       
// Here we control what is happenning when we click the mouse
map.on('click', function(event){
    //console.log ('Mouse Ckicked');
    //console.log (event.point);

// we identify geometry under the mouse click
    var geometry= event.point;
// we choose the layer name that we need    
    var parameters = {
        layers:['land-use-mn']
    };
    var features = map.queryRenderedFeatures(geometry, parameters);
    //console.log (features);
    //console.log (features.length + ' features');
    var lot = features[0];
    console.log(lot);

// If there is layer under the mouse click we take the layer's features
    if(features.length) {
        var BBL = lot.properties.BBL  || '-';
        var LandUse = LandUsenames [lot.properties.LandUse] || '-';
        var OwnerName = lot.properties.Ownername || '-';
        var ZoneDist1 = lot.properties.ZoneDist1 || '-';
        var BldgClass = lot.properties.BldgClass || '-';

// Here we create popup
        var popup = new mapboxgl.Popup()
            .setLngLat(event.lngLat)
            .setHTML('<dl>' +  // We define the content of the popup
                '<dt>BBL</dt>' + 
                '<dd>' + BBL + '</dd>' + 
                '<dt>Land Use</dt>' + 
                '<dd>' + LandUse + '</dd>' + 
                '<dt>Owner</dt>' + 
                '<dd>' + OwnerName + '</dd>' + 
                '<dt>Zoning District</dt>' + 
                '<dd>' + ZoneDist1 + '</dd>' + 
                '<dt>Building Class</dt>' + 
                '<dd>' + BldgClass + '</dd>' + 
            '</dl>')
            .addTo(map);
    }
});