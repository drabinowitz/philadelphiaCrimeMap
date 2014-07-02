function initialize( mapOptions ) {

	function drawPerimeter( lat,lng,accuracy,scale ){

		if (accuracy >= 3 && Math.floor(accuracy) == accuracy){

			var coordinates = []

			for(var i = 0; i <= accuracy;i++){

				coordinates.push([

					lat + scale * Math.cos( 2 * Math.PI * i / accuracy ),

					lng + scale * Math.sin( 2 * Math.PI * i / accuracy )

				]);

			}

			return coordinates;

		} else {

			console.log('invalid accuracy value of ' + accuracy + ' accuracy must be an integer value of 3 or greater');

		}

	};

	var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

	return {

		map: map,

		setMapBoundaries: function( allowedBounds ){

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

		},

		setEsriClickEvent: function( accuracy,scale,esriRequest ) {

			google.maps.event.addListener(map,'click',function(event){

				$('.overlay').show();

				var coordinates = drawPerimeter(event.latLng.lat(),event.latLng.lng(),accuracy,scale);

				var result = esri.getAjaxResponse( esriRequest,coordinates )

				.done(function(result){

					$('.overlay').hide();

					$.each(result.features,function(index,value){

						var newMarker = new google.maps.Marker({

						position: new google.maps.LatLng(value.attributes.POINT_Y,value.attributes.POINT_X),

						map: map,

						title: 'Click to zoom'

						});

					});

				});

			});

		}

	};

}