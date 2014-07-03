function drawEllipse( latLng1,latLng2,scale,accuracy ){

/*		if (accuracy >= 3 && Math.floor(accuracy) == accuracy){

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

		}*/
	accuracy = 2 * accuracy;

	var coordinates = []

	var theta = Math.atan( ( latLng2[1]-latLng1[1] ) / ( latLng2[0]-latLng1[0] ) )

	for(var i = 0; i <= accuracy;i++){

		coordinates.push([

			latLng1[0] + scale * Math.cos( theta - Math.PI * i / accuracy + Math.PI / 2 ),

			latLng1[1] + scale * Math.sin( theta - Math.PI * i / accuracy + Math.PI / 2 )

		]);

	}

	for(var j = 0; j <= accuracy;j++){

		coordinates.push([

			latLng2[0] + scale * Math.cos( theta - Math.PI * j / accuracy - Math.PI / 2 ),

			latLng2[1] + scale * Math.sin( theta - Math.PI * j / accuracy - Math.PI / 2 )

		]);

	}

	coordinates.push([

		latLng1[0] + scale * Math.cos( theta + Math.PI / 2 ),

		latLng1[1] + scale * Math.sin( theta + Math.PI / 2 )

	]);

	return coordinates;

}

var coordinatesEllipse = drawEllipse( [39.9578866,-75.1698302],[39.9608866,-75.1728302],0.001,8 );

var perimeterCoordinatesEllipse = [];

$.each(coordinatesEllipse,function(index,value){

	perimeterCoordinatesEllipse.push( new google.maps.LatLng(value[0],value[1]) )

})

perimeter = new google.maps.Polygon({

	paths: perimeterCoordinatesEllipse,

	strokeColor: '#FF0000',

	strokeOpacity: 0.8,

	strokeWeight: 2,

	fillColor: '#FF0000',

	fillOpacity: 0.35

});

perimeter.setMap(gMap);