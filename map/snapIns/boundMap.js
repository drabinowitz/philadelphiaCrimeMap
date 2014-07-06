$(document).ready(function(){

	var boundMap = ( function( map,allowedBounds ){

		google.maps.event.addListener(map,'center_changed',function(){   

			if(! allowedBounds.contains(map.getCenter())) {

				var C = map.getCenter();

				var X = C.lng();

				var Y = C.lat(); 

				var AmaxX = allowedBounds.getNorthEast().lng();

				var AmaxY = allowedBounds.getNorthEast().lat();

				var AminX = allowedBounds.getSouthWest().lng();

				var AminY = allowedBounds.getSouthWest().lat();

				if (X < AminX) {X = AminX;}

				if (X > AmaxX) {X = AmaxX;}

				if (Y < AminY) {Y = AminY;}

				if (Y > AmaxY) {Y = AmaxY;}

				map.setCenter(new google.maps.LatLng(Y,X));

			}

		});

	})( globals.map,globals.map.getBounds() );

});