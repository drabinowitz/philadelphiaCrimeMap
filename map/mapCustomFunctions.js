var mapCustomFunctions = function(map){

	return{

		fluidZoom: function( zoomLevel,stepSize,stepSpeed ){

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

		},

		mapBoundaries: function( allowedBounds ){

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

		esriClickEvent: function( request,accuracy,scale ) {

			google.maps.event.addListener(map,'click',function(event){

				$('.overlay').show();

				var coordinates = draw.circle(event.latLng.lat(),event.latLng.lng(), accuracy,scale );

				var result = esri.getAjaxResponse( request,coordinates )

				.done(function(result){

					$('.overlay').hide();

					$.each(result.features,function(index,value){

						var newMarker = new google.maps.Marker({

							position: new google.maps.LatLng(value.attributes.POINT_Y,value.attributes.POINT_X),

							map: map,

							title: 'Click to zoom'

						});

					});

					map.panTo( event.latLng );

					map.setZoom( 17 );

					var perimeterCoordinates = [];

					$.each(coordinates,function(index,value){

						perimeterCoordinates.push( new google.maps.LatLng(value[0],value[1]) )

					})

					perimeter = new google.maps.Polygon({

						paths: perimeterCoordinates,

						strokeColor: '#FF0000',

						strokeOpacity: 0.8,

						strokeWeight: 2,

						fillColor: '#FF0000',

						fillOpacity: 0.35

					});

					perimeter.setMap(map);

				});

			});

		}

	};

}