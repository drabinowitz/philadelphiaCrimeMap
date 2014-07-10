$(document).ready(function(){

	var buildHeatCrimeOverlay = (function( map,request,coordinates,heatmapConfig,heatmapDataMax ){

		var heatmap = new HeatmapOverlay( map,heatmapConfig );

		var coordinateSections = draw.subRectangle( coordinates,4 );

		google.maps.event.addListenerOnce(map, "idle", function(){

			$('.overlay').show();

			var result = [];

			$.when(

				esri.getAjaxResponse( request,coordinateSections[0] ).done(function(data){result.push(data)}),

				esri.getAjaxResponse( request,coordinateSections[1] ).done(function(data){result.push(data)}),

				esri.getAjaxResponse( request,coordinateSections[2] ).done(function(data){result.push(data)}),

				esri.getAjaxResponse( request,coordinateSections[3] ).done(function(data){result.push(data)})

			)

			.then(function(){

				$('.overlay').hide();

				var heatmapData = [];

				$.each(result,function(index,shapeData){

					$.each(shapeData.features,function(index,value){

			    		heatmapData.push(

			    			{

			    				lat: value.geometry.y, 

			    				lng: value.geometry.x,

			    				count: 1

			    			}

			    		);

			    	});

				});

		    	globals.heatmapData = heatmapData;

		    	heatmap.setDataSet({ max: heatmapDataMax, data: heatmapData });

		    },

		    function(){

				alert("the Query failed.  This suggests a possible issue with our internet connection or with the data source.  Please check your connection and refresh the page");

			});


		});

	})(

		globals.map,

		{

			url: "http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents_Last30/MapServer/0/query",

			data: {

				geometry: undefined,

				geometryType: "esriGeometryPolygon",

				spatialRel: "esriSpatialRelContains",

				where: "DC_DIST=3 OR DC_DIST=6 OR DC_DIST=9 OR DC_DIST=16 OR DC_DIST=17 OR DC_DIST=18 OR DC_DIST=19 OR DC_DIST=26",

				inSR: 4326,

				returnGeometry: true,

				outSR: 4326,

				f: "pjson",

				pretty: true

			},

			dataType: "jsonp",

			type: "GET"

		},

		draw.rectangle([39.91716245326531,-75.27002865581053],[39.99965090420449,-75.10163174418943]),

		{
		
		    radius : 20,

		    visible : true,

		    opacity : 40
		
		},

		5

	);

});