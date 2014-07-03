var gMap;

$(document).ready(function(){

	var zoomLevel = 13;

	var mapOptions = {

		center: new google.maps.LatLng(39.9578866,-75.1698302),

		zoom: zoomLevel,

		minZoom: zoomLevel,

		draggable: true,

		overviewMapControl: false,

		panControl: true

	};

	var esriClickOptions = {

		geometry: undefined,

		geometryType: "esriGeometryPolygon",

		spatialRel: "esriSpatialRelContains",

		where: "DISPATCH_DATE>'" + (new Date().getFullYear()-1).toString() + "-07-01'",

		outFields: "UCR_GENERAL,HOUR,POINT_X,POINT_Y",

		inSR: 4326,

		outSR: 4326,

		f: "pjson",

		pretty: true

	};

	var esriClickRequest = {
				
		url: "http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents/MapServer/0/query",
		
		data: esriClickOptions,
		
		dataType: "jsonp",
		
		type: "GET",

	};

	var googleMap = initialize( mapOptions );

	google.maps.event.addListenerOnce(googleMap.map, 'idle', function() {
    
    	googleMap.setMapBoundaries( googleMap.map.getBounds() );

    	googleMap.setEsriClickEvent( 16,0.002,esriClickRequest );
	
	});

	gMap = googleMap.map;

});