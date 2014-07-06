var globals = {

	map : undefined,

	mapStyleAndOptions : {

		mapStyle : [

			{

				featureType: "administrative",

				elementType: "labels",

				stylers: [

					{ visibility: "off" }

				]

			},

			{

				featureType: "poi",

				elementType: "all",
				
				stylers: [
				
					{ visibility: "off" }
				
				]
			
			},

			{
			
				featureType: "water",
				
				elementType: "geometry",
				
				stylers: [
				
					{ color: "#DDDDFF" }
				
				]
			
			},

			{
			
				featureType: "landscape",
				
				elementType: "all",
				
				stylers: [
				
					{ visibility: "off" }
				
				]
			
			},

			{
			
				featureType: "road",
				
				elementType: "labels",
				
				stylers: [
				
					{ visibility: "off" }
				
				]
			
			},

			{
			
				featureType: "road.local",
				
				elementType: "labels",
				
				stylers: [
				
					{ visibility: "on" }
				
				]
			
			},

			{
			
				featureType: "road.arterial",
				
				elementType: "labels",
				
				stylers: [
				
					{ visibility: "on" }
				
				]
			
			},

			{
			
				featureType: "road.highway",
				
				elementType: "geometry",
				
				stylers: [
				
					{ color: "#BBCCCC" }
				
				]
			
			},

			{
			
				featureType: "transit",
				
				elementType: "all",
				
				stylers: [
				
					{ visibility: "off" }
				
				]
			
			}

		],

		mapOptions : {

			mapTypeControlOptions: {

	    		mapTypeIds: ['mapStyle', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN]
	    	
	    	},

	    	backgroundColor: '#fff',

	    	mapTypeId: 'mapStyle',

			center: new google.maps.LatLng(39.9578866,-75.1698302),

			zoom: zoomLevel,

			minZoom: zoomLevel,

			draggable: false,

			disableDefaultUI: true,

			disableDoubleClickZoom: true,

			noClear: true,

			scrollwheel: false,

			keyboardShortcuts: false

		}

	}

}