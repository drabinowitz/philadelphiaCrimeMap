$(document).ready(function(){

	var zoomLevel = 13;

	var myStyle = [

		{

			featureType: "administrative",

			elementType: "labels",

			stylers: [

				{ visibility: "off" }

			]

		},

		{

			featureType: "poi",

			elementType: "all",
			
			stylers: [
			
				{ visibility: "off" }
			
			]
		
		},

		{
		
			featureType: "water",
			
			elementType: "geometry",
			
			stylers: [
			
				{ color: "#DDDDFF" }
			
			]
		
		},

		{
		
			featureType: "landscape",
			
			elementType: "all",
			
			stylers: [
			
				{ visibility: "off" }
			
			]
		
		},

		{
		
			featureType: "road",
			
			elementType: "labels",
			
			stylers: [
			
				{ visibility: "off" }
			
			]
		
		},

		{
		
			featureType: "road.local",
			
			elementType: "labels",
			
			stylers: [
			
				{ visibility: "on" }
			
			]
		
		},

		{
		
			featureType: "road.arterial",
			
			elementType: "labels",
			
			stylers: [
			
				{ visibility: "on" }
			
			]
		
		},

		{
		
			featureType: "road.highway",
			
			elementType: "geometry",
			
			stylers: [
			
				{ color: "#DDCCCC" }
			
			]
		
		},

		{
		
			featureType: "transit",
			
			elementType: "all",
			
			stylers: [
			
				{ visibility: "off" }
			
			]
		
		}

	];

	var mapOptions = {

		mapTypeControlOptions: {
         mapTypeIds: ['mystyle', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN]
    	},

    	backgroundColor: '#fff',

    	mapTypeId: 'mystyle',

		center: new google.maps.LatLng(39.9578866,-75.1698302),

		zoom: zoomLevel,

		minZoom: zoomLevel,

		draggable: false,

		disableDefaultUI: true,

		disableDoubleClickZoom: true,

		noClear: true,

		scrollwheel: false,

		keyboardShortcuts: false

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

	var googleMap = initialize( mapOptions,myStyle );

	google.maps.event.addListenerOnce(googleMap.map, 'idle', function() {
    
    	googleMap.setMapBoundaries( googleMap.map.getBounds() );

    	googleMap.setEsriClickEvent( 16,0.002,esriClickRequest );
	
	});

	var coordinatesEllipse = drawEllipse( [39.9578866,-75.1698302],[39.9608866,-75.1728302],0.001,8 );

	var perimeterCoordinatesEllipse = [];

	$.each(coordinatesEllipse,function(index,value){

		perimeterCoordinatesEllipse.push( new google.maps.LatLng(value[0],value[1]) )

	})

	perimeter = new google.maps.Polygon({

		paths: perimeterCoordinatesEllipse,

		strokeColor: '#FF0000',

		strokeOpacity: 0.8,

		strokeWeight: 2,

		fillColor: '#FF0000',

		fillOpacity: 0.35

	});

	perimeter.setMap(googleMap.map);

});