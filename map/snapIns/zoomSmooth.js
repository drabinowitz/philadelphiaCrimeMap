$(document).ready(function(){

	var zoomSmooth = ( function ( zoomLevel,stepSize,stepSpeed ) {

		var zoomStep = map.getZoom();

		if( zoomStep >= zoomLevel - stepSize ){

			map.setZoom(zoomLevel);

		} else {

			zoomStep += stepSize - ( zoomLevel - zoomStep ) % stepSize;

			map.setZoom(zoomStep);

			setTimeout( function(){

				fluidZoom( zoomLevel,stepSize,stepSpeed );

			}, stepSpeed );

		}

	})();

});

//need to try to add event listener on map zoom!!