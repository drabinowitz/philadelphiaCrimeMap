function drawEllipse( latLng1,latLng2,radius,accuracy ){

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

	var theta = atan( ( latLng2[1]-latLng1[1] ) / ( latLng2[0]-latLng1[0] ) )

	for(var i = 0; i <= accuracy;i++){

		coordinates.push([

			latLng1[0] + scale * Math.cos( theta + Math.PI * i / accuracy ),

			latLng1[1] + scale * Math.sin( theta + Math.PI * i / accuracy )

		]);

	}

	for(var j = 0; j <= accuracy;j++){

		coordinates.push([

			latLng2[0] + scale * Math.cos( theta - Math.PI * j / accuracy ),

			latLng2[1] + scale * Math.sin( theta - Math.PI * j / accuracy )

		]);

	}

	coordinates.push([

		latLng1[0] + scale * Math.cos( theta ),

		latLng1[1] + scale * Math.sin( theta )

	]);

	return coordinates;

}