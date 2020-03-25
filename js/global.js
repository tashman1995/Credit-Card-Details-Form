

jQuery(document).ready(function(){

	jQuery('#slideshow').cycle({
		fx:				'fade',
		speed:			1000,
		timeout:		7000,
		slideExpr:		'div.slide',
		prev:			'#prev',
		next:			'#next'
	});


	var span = "<span></span>";

	$('a.green-arrow-link').append(span);


});