$(document).ready(function(){

	var googleMap = (function initialize( mapStyleAndOptions ) {

		var map = new google.maps.Map(document.getElementById("map-canvas"),mapStyleAndOptions.mapOptions);

		if (mapStyleAndOptions.hasOwnProperty('mapStyle')){

			map.mapTypes.set('mapStyle', new google.maps.StyledMapType(mapStyleAndOptions.mapStyle, { name: 'Map Style' }));

		}

		return {

			map: map

		};

	})( globals.mapStyleAndOptions );

	globals.map = googleMap.map;

});