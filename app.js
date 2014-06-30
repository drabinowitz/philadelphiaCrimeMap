$(document).ready(function(){

	(function initialize() {

		var mapOptions = {

		  center: new google.maps.LatLng(-34.397, 150.644),

		  zoom: 8

		};

		var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

		var marker = new google.maps.Marker({

		  position: map.getCenter(),

		  map: map,

		  title: 'Click to zoom'

		});

		google.maps.event.addListener(map,'center_changed',function(){

			window.setTimeout(function(){

				map.panTo(marker.getPosition());

			},3000);

		});

		google.maps.event.addListener(marker,'click',function(){

			map.setZoom(8);

			map.setCenter(marker.getPosition());

		});

		google.maps.event.addListener(map,'click',function(event){

		  var newMarker = new google.maps.Marker({

		  position: event.latLng,

		  map: map,

		  title: 'Click to zoom'

		});

		});

	})();

});