var esri = (function(){

	function buildEsriCoordinates( coordinates ){

		var esriCoordinates = '{"rings":[[';

		for (var i = 0; i < coordinates.length; i++){

			if (i){

				esriCoordinates += ',';

			}

			esriCoordinates += '[' + coordinates[i][1] + ',' + coordinates[i][0] + ']';

		}

		esriCoordinates += ']],"spatialReference":{"wkid":4326}}'

		return esriCoordinates;

	}

	return{

		getAjaxResponse: function( request,coordinates ){

			request.data.geometry = buildEsriCoordinates( coordinates );

			return $.ajax(request);

		}

	};

})();