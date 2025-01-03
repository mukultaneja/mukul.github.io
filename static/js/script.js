$("document").ready(function() {
	var offset = 600,
		duration = 1000,
		to_year = new Date().getFullYear();

	$('div.copyright center, div.footer footer').html('&copy; Mukul Taneja - ' + to_year);
	$(window).scroll(function() {
		if ($(this).scrollTop() > offset) {
			$('.back-to-top').fadeIn(duration);
		} else {
			$('.back-to-top').fadeOut(duration);
		}
	});
	$('.back-to-top').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, duration);
		return false;
	});
	skillsArcs();
});