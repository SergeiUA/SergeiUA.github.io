$(function() {
	var $tab = $('.tab__button'),
	$tabContent = $('.tab__content');

	$tab.on('click', function() {
		$tab.removeClass('tab__button__active');
		$(this).addClass('tab__button__active');
		$tabContent.removeClass('tab__content__active');
		$tabContent.eq($(this).index()).addClass('tab__content__active');
	});


	var $tooltip = $('.tooltip__box'),
	$button = $('button');

	$('.input').hover(
		function() {
			var $tooltipNumber = $('.input').index(this);
			$tooltip.eq($tooltipNumber).stop().animate({opacity: 1}, 300);
		},
		function() {
			var $tooltipNumber = $('.input').index(this);
			$tooltip.eq($tooltipNumber).stop().animate({opacity: 0}, 100);
		});

	$button.on('click', function(e) {
		e.preventDefault();
		$tooltip.css('opacity', '1');
	});

});