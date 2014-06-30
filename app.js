$(document).ready(function(){

	(function initialize() {

		var mapOptions = {

		  center: new google.maps.LatLng(39.9578866,-75.1698302),

		  zoom: 13,

		  minZoom: 13,

		  draggable: false,

		  overviewMapControl: false,

		  panControl: false

		};

		var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

		var marker = new google.maps.Marker({

		  position: map.getCenter(),

		  map: map,

		  title: 'Click to zoom'

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

	var result = $.ajax({
		url: "https://maps.googleapis.com/maps/api/place/textsearch/json",
		data: {

			query:"Philadelphia",

			key:"AIzaSyCeONSkk-jDozekhXZffdnTgbqOyVe7KH0"

		},
		dataType: "jsonp",
		type: "GET"
		}).done(function(result){
			debugger;
			alert(result.results.length);

		});

});