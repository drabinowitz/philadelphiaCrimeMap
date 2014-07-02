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

		google.maps.event.addListenerOnce(map, 'idle', function() {
        
        	allowedBounds = map.getBounds();
    	
    	});

		google.maps.event.addListener(map,'click',function(event){

			$('.overlay').show();

			var coordinates = drawPerimeter(event.latLng.lat(),event.latLng.lng(),9,0.002);

			var esriCoordinates = '{"rings":[[';

			for (var i = 0; i < coordinates.length; i++){

				if (i){

					esriCoordinates += ',';

				}

				esriCoordinates += '[' + coordinates[i][1] + ',' + coordinates[i][0] + ']';

			}

			esriCoordinates += ']],"spatialReference":{"wkid":4326}}';

			/*'{"rings":[[[-75.16505599021912,39.95365185651431],[-75.16235232353209,39.95329409673581],[-75.16274392604828,39.951423023730335],[-75.16437470912933,39.95170677215989],[-75.16496479511261,39.951805466989896],[-75.16525983810425,39.95202341756838],[-75.16528129577637,39.95224136745237],[-75.16524910926819,39.95252922472533],[-75.16513645648956,39.9529856816317],[-75.16510963439941,39.95331876988407],[-75.16505599021912,39.95365185651431]]],"spatialReference":{"wkid":4326}}'*/

			var request = {

				geometry: esriCoordinates,

				geometryType: "esriGeometryPolygon",

				spatialRel: "esriSpatialRelContains",

				where: "DISPATCH_DATE>'" + (new Date().getFullYear()-2).toString() + "-01-01'",

				outFields: "UCR_GENERAL,HOUR,POINT_X,POINT_Y",

				inSR: 4326,

				outSR: 4326,

				f: "pjson",

				pretty: true

			};

			var result = $.ajax({
				
				url: "http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents/MapServer/0/query",
				
				data: request,
				
				dataType: "jsonp",
				
				type: "GET",

			})
 
			.done(function(result){

				$('.overlay').hide();

				$.each(result.features,function(index,value){

					var newMarker = new google.maps.Marker({

						position: new google.maps.LatLng(value.attributes.POINT_Y,value.attributes.POINT_X),

						map: map,

						title: 'Click to zoom'

					});

					locationListener(newMarker);

				});

			})

			.fail(function(result){

				$('.overlay').hide();

			});

		});

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

		function locationListener(marker) {

			var local = marker.getPosition();

			var infowindow = new google.maps.InfoWindow({

				content: local.lat() + " " + local.lng()

			});

			google.maps.event.addListener(marker, 'click', function() {

				infowindow.open(marker.get('map'), marker);

			});

		}


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