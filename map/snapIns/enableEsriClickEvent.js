$(document).ready(function(){

	var enableEsriClickEvent = (function( map,request,accuracy,scale ) {

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

	})(

		globals.map,

		{

			url: "http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents/MapServer/0/query",

			data: {

				geometry: undefined,

				geometryType: "esriGeometryPolygon",

				spatialRel: "esriSpatialRelContains",

				where: "DISPATCH_DATE>'" + (new Date().getFullYear()-1).toString() + "-07-01'",

				outFields: "UCR_GENERAL,HOUR,POINT_X,POINT_Y",

				inSR: 4326,

				outSR: 4326,

				f: "pjson",

				pretty: true

			},

			dataType: "jsonp",

			type: "GET"

		},

		16,

		0.002

	);

});