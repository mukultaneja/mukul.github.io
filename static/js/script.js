$("document").ready(function() {
	var offset = 600,
		duration = 1000,
		to_year = new Date().getFullYear(),
		links = ['.skills-link', '.rewards-link'];

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
	$.each(links, function(index, value) {
		$(value).click(function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top
			}, 1500);
			if (value == '.skills-link')
				skillsArcs();
			return false;
		});
	});
	skillsArcs();
});