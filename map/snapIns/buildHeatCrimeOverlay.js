$(document).ready(function(){

	var buildHeatCrimeOverlay = (function( map,request,coordinates,heatmapConfig,heatmapDataMax ){

		var heatmap = new HeatmapOverlay( map,heatmapConfig );

		google.maps.event.addListenerOnce(map, "idle", function(){

			$('.overlay').show();

			debugger;

			var result = esri.getAjaxResponse( request,coordinates )

			.done(function(result){

				$('.overlay').hide();

				var heatmapData = [];

				$.each(result.features,function(index,value){

		    		heatmapData.push(

		    			{

		    				lat: value.attributes.POINT_Y, 

		    				lng: value.attributes.POINT_X,

		    				count: 1

		    			}

		    		);

		    	});

		    	heatmap.setDataSet({ max: heatmapDataMax, data: heatmapData });

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

				outFields: "POINT_X,POINT_Y",

				inSR: 4326,

				returnGeometry: false,

				outSR: 4326,

				f: "pjson",

				pretty: true

			},

			dataType: "jsonp",

			type: "GET"

		},

		[

			[39.91716245326531, -75.27402865581053],

			[39.97965090420449, -75.27402865581053],

			[39.97965090420449, -75.06563174418943],

			[39.91716245326531, -75.06563174418943],

			[39.91716245326531, -75.27402865581053]

		],

		{
		
		    radius : 20,

		    visible : true,

		    opacity : 60
		
		},

		3

	);

});