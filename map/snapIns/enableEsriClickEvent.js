$(document).ready(function(){

	var enableEsriClickEvent = (function( map,request,accuracy,scale ) {

		globals.mapMarkers = [];

		google.maps.event.addListener(map,'click',function(event){

			$('.overlay').show();

			var coordinates = draw.circle(event.latLng.lat(),event.latLng.lng(), accuracy,scale );

			var result = esri.getAjaxResponse( request,coordinates )

			.done(function(result){

				$('.overlay').hide();

				$.each(result.features,function(index,value){

					var newMarker = new google.maps.Marker({

						position: new google.maps.LatLng(value.geometry.y,value.geometry.x),

						map: map,

						title: 'Click to zoom'

					});

					globals.mapMarkers.push(newMarker);

				});

				map.panTo( event.latLng );

				map.setZoom( 17 );

				var perimeterCoordinates = [];

				$.each(coordinates,function(index,value){

					perimeterCoordinates.push( new google.maps.LatLng(value[0],value[1]) )

				})

				perimeter = new google.maps.Polygon({

					paths: perimeterCoordinates,

					strokeColor: '#222222',

					strokeOpacity: 0.3,

					strokeWeight: 2,

					fillColor: '#222222',

					fillOpacity: 0.1

				});

				perimeter.setMap(map);

			})

			.fail(function(){

				alert("the Query failed.  This suggests a possible issue with our internet connection or with the data source.  Please check your connection and refresh the page");

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

				where: new Date().getMonth() < 6 ? "DISPATCH_DATE>'" + (new Date().getFullYear()-1) + "-" + (12 + new Date().getMonth() - 5) + "-01'" : "DISPATCH_DATE>'" + (new Date().getFullYear()) + "-0" + (new Date().getMonth() - 5) + "-01'" ,

				outFields: "UCR_GENERAL,HOUR",

				inSR: 4326,

				outSR: 4326,

				f: "pjson",

				pretty: true

			},

			dataType: "jsonp",

			type: "GET"

		},

		32,

		0.004

	);

});