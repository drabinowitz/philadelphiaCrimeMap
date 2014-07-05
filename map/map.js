function initialize( mapSettings ) {
/*	
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

	}*/

	var map = new google.maps.Map(document.getElementById("map-canvas"),mapSettings.mapOptions);

	if (mapSettings.hasOwnProperty('mapStyle')){

		map.mapTypes.set('mystyle', new google.maps.StyledMapType(mapSettings.mapStyle, { name: 'Map Style' }));

	}

	if (mapSettings.hasOwnProperty('mapCustomOptions'))

	return {

		map: map

		}

	};

}