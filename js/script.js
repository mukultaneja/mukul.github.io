$("document").ready(function() {

	var offset = 600,
		duration = 300,
		to_year = new Date().getFullYear(),
		links = ['.main-page', '.skills-link', '.about-me-link', '.project-link', '.contact-me-link'],
		trigger = $('.hamburger'),
		overlay = $('.overlay'),
		wrapper = $('#page-content-wrapper'),
		isClosed = false,
		windowScrollCount = 0;

	$('div.copyright center, div.footer footer').html('&copy; Mukul Taneja - ' + to_year);

	$(window).scroll(function() {
		if ($(this).scrollTop() > offset) {
			$('.back-to-top').fadeIn(duration);
			if (windowScrollCount == 0) {
				lifeCycle();
				skillsArcs();
			}
			windowScrollCount += 1;
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
			$('[data-toggle="offcanvas"]').trigger('click');
			overlay.hide();
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
			wrapper.css({
				'width': '100%'
			});
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top
			}, 800);
			if (value == '.about-me-link')
				if (windowScrollCount == 0)
					lifeCycle();
			if (value == '.skills-link')
				if (windowScrollCount == 0)
					skillsArcs();
			return false;
		});
	});

	trigger.click(function() {
		hamburger_cross();
	});

	function hamburger_cross() {

		if (isClosed == true) {
			overlay.hide();
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
			wrapper.css({
				'width': '100%'
			});
			isClosed = false;
		} else {
			overlay.show();
			trigger.removeClass('is-closed');
			trigger.addClass('is-open');
			wrapper.css({
				'width': '0'
			});
			isClosed = true;
		}
	}

	$('[data-toggle="offcanvas"]').click(function() {
		$('#wrapper').toggleClass('toggled');
	});

});