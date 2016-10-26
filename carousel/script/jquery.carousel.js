(function ($) {
	$.fn.carousel = function(){
		var carouselLeft = $('.carousel__control__left'),
		carouselRight = $('.carousel__control__right'),
		carouselList = $('.carousel__list');
		var leftValue = 0,
		offsetValue = 255;
		var itemsCount = $('.carousel__element').length,
		offsetMin = 0,
		offsetMax = -(offsetValue * (itemsCount-3));

		carouselLeft.click(function(e){
			e.preventDefault();
			if(leftValue != offsetMin){
				leftValue += 255;
				carouselList.animate({ left : leftValue + "px"}, 400);
			}
		});
		carouselRight.click(function(e){
			e.preventDefault();
			if(leftValue != offsetMax){
				leftValue -= 255;
				carouselList.animate({ left : leftValue + "px"}, 400);
			}
		});
	}
})(jQuery);