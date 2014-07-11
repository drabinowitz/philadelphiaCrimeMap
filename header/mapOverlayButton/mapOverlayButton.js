$(document).ready(function(){

	var mapOverlayButton = (function( map,center,zoom ){

		google.maps.event.addListener(map,'zoom_changed',function(){

			if (map.getZoom() == zoom){

				$('.mapOverlayButton').hide();

			} else {

				$('.mapOverlayButton').show();

			}

		});

		$('.mapOverlayButton').click(function(){

			map.setZoom( zoom );

			map.setCenter( center );

			$.each(globals.mapMarkers,function(index){

				globals.mapMarkers[index].setMap(null)

			});

		});

	})(

		globals.map,

		globals.mapStyleAndOptions.mapOptions.center,

		globals.mapStyleAndOptions.mapOptions.zoom

	);

})