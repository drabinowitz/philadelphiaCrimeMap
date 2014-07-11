var draw = {

	subRectangle : function( coordinates,numberOfSections ){

		var coordinateSections = [];

		var divider = function(latLng,section){

			return coordinates[0][latLng] + section * ( coordinates[2][latLng] - coordinates[0][latLng] ) / numberOfSections;

		};

		for(var i = 0; i < numberOfSections;i++ ){

			var subCoordinates = draw.rectangle(

				[

					coordinates[0][0],

					divider( 1, i )

				],

				[

					coordinates[2][0],

					divider( 1, i + 1 )

				]

			);

			coordinateSections.push( subCoordinates );

		}

		return coordinateSections;

	},

	square : function( lat,lng,scale ){

		var coordinates = [];

		for(var i = 0; i <= 4;i++){

			coordinates.push([

				lat + scale * Math.cos( 2 * Math.PI * i / 4 + Math.PI / 4 ),

				lng + scale * Math.sin( 2 * Math.PI * i / 4 + Math.PI / 4 )

			]);

		}

		return coordinates;

	},

	rectangle : function( latLng1,latLng2 ){

		var coordinates = [

			latLng1,

			[latLng1[0],latLng2[1]],

			latLng2,

			[latLng2[0],latLng1[1]],

			latLng1

		];

		return coordinates;

	},

	circle : function ( lat,lng,accuracy,scale ){

		if (accuracy >= 3 && Math.floor(accuracy) == accuracy){

			var coordinates = [];

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

	},

	ellipse : function ( latLng1,latLng2,scale,accuracy ){

		accuracy = 2 * accuracy;

		var coordinates = [];

		var theta = Math.atan( ( latLng2[1]-latLng1[1] ) / ( latLng2[0]-latLng1[0] ) );

		for(var i = 0; i <= accuracy;i++){

			coordinates.push([

				latLng1[0] + scale * Math.cos( theta - Math.PI * i / accuracy - Math.PI / 2 ),

				latLng1[1] + scale * Math.sin( theta - Math.PI * i / accuracy - Math.PI / 2 )

			]);

		}

		for(var j = 0; j <= accuracy;j++){

			coordinates.push([

				latLng2[0] + scale * Math.cos( theta - Math.PI * j / accuracy + Math.PI / 2 ),

				latLng2[1] + scale * Math.sin( theta - Math.PI * j / accuracy + Math.PI / 2 )

			]);

		}

		coordinates.push(coordinates[0]);

		return coordinates;

	}

};

/*var coordinatesEllipse = drawEllipse( [39.9578866,-75.1698302],[39.9608866,-75.1728302],0.001,8 );

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

perimeter.setMap(googleMap.map);*/