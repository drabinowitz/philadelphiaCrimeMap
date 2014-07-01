$(document).ready(function(){

	(function initialize() {

		var mapOptions = {

		  center: new google.maps.LatLng(39.9578866,-75.1698302),

		  zoom: 13,

		  minZoom: 13,

		  draggable: true,

		  overviewMapControl: false,

		  panControl: true

		};

		var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

		var allowedBounds;

		var marker = new google.maps.Marker({

		  position: map.getCenter(),

		  map: map,

		  title: 'Click to zoom'

		});

		google.maps.event.addListenerOnce(map, 'idle', function() {
         allowedBounds = map.getBounds();
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

		google.maps.event.addListener(map,'center_changed',function() { checkBounds(); });

		function checkBounds() {   

    		if(! allowedBounds.contains(map.getCenter())) {
		      var C = map.getCenter();
		      var X = C.lng();
		      var Y = C.lat(); 

		      var AmaxX = allowedBounds.getNorthEast().lng();
		      var AmaxY = allowedBounds.getNorthEast().lat();
		      var AminX = allowedBounds.getSouthWest().lng();
		      var AminY = allowedBounds.getSouthWest().lat();

		      // console.log( 'X,Y value before change ' + X + ',' + Y  );
   		      // console.log( 'AmaxX,AmaxY and AminX,AminY value before change ' +  AminX + ',' + AminY + ' and ' + AmaxX + ',' + AmaxY  );

		      if (X < AminX) {X = AminX;}
		      if (X > AmaxX) {X = AmaxX;}
		      if (Y < AminY) {Y = AminY;}
		      if (Y > AmaxY) {Y = AmaxY;}

		      // console.log( 'X,Y value after change ' + X + ',' + Y  );

		      map.setCenter(new google.maps.LatLng(Y,X));
    		}
		}

	})();

});