$(document).ready(function(){

	var toggleInstructions = function(){

		if (  $('.instructionBody').is(':visible')  ){

			$('.instructionBody').slideUp();

		} else {

			$('.instructionBody').slideDown();

		}

	};

	$('.instructions').on('click',toggleInstructions);

})