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

			var request = {

				geometry: '{"rings":[[[-75.16505599021912,39.95365185651431],[-75.16235232353209,39.95329409673581],[-75.16274392604828,39.951423023730335],[-75.16437470912933,39.95170677215989],[-75.16496479511261,39.951805466989896],[-75.16525983810425,39.95202341756838],[-75.16528129577637,39.95224136745237],[-75.16524910926819,39.95252922472533],[-75.16513645648956,39.9529856816317],[-75.16510963439941,39.95331876988407],[-75.16505599021912,39.95365185651431]]],"spatialReference":{"wkid":4326}}',

				geometryType: 'esriGeometryPolygon',

				spatialRel: 'esriSpatialRelContains',

				outFields: '*',

				inSR: 4326,

				outSR: 4326,

				f: 'pjson',

				pretty: true

			};

			var result = $.ajax({
				
				url: "http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents/MapServer/0/query",
				
				data: request,
				
				dataType: "jsonp",
				
				type: "GET",

			})
 
			.done(function(result){debugger;});

			/*http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents/MapServer/0/query?geometry={"rings":[[[-75.16505599021912,39.95365185651431],[-75.16235232353209,39.95329409673581],[-75.16274392604828,39.951423023730335],[-75.16437470912933,39.95170677215989],[-75.16496479511261,39.951805466989896],[-75.16525983810425,39.95202341756838],[-75.16528129577637,39.95224136745237],[-75.16524910926819,39.95252922472533],[-75.16513645648956,39.9529856816317],[-75.16510963439941,39.95331876988407],[-75.16505599021912,39.95365185651431]]],"spatialReference":{"wkid":4326}}&geometryType=esriGeometryPolygon&spatialRel=esriSpatialRelContains&outFields=*&inSR=4326&outSR=4326&f=pjson&pretty=true*/

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