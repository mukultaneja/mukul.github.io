$("document").ready(function() {

	var offset = 600,
		duration = 1000,
		to_year = new Date().getFullYear(),
		links = ['.main-page', '.skills-link', '.about-me-link',
			'.resume', '.project-link', '.contact-me-link', '.blogs', '.rewards-link'
		],
		trigger = $('.hamburger'),
		overlay = $('.overlay'),
		wrapper = $('.page-content-wrapper'),
		isClosed = false,
		windowScrollCount = 0;

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
			//e.preventDefault();
			$('[data-toggle="offcanvas"]').trigger('click');
			overlay.hide();
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
			wrapper.css({
				'width': '100%'
			});
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top
			}, 1500);

			if (value == '.about-me-link')
				lifeCycle();

			if (value == '.skills-link')
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

	$('#subject').blur(function() {
		var href = $('.submit').attr('href');
		href += '?subject=' + $(this).val();
		$('.submit').attr('href', href)
	})

	$('#message').blur(function() {
		var href = $('.submit').attr('href');
		if (href.indexOf('subject') != -1)
			href += '&body=' + $(this).val();
		else
			href += '?body=' + $(this).val();
		$('.submit').attr('href', href)
	})

	setInterval(function() {
		$('.typewriter').css({
			'border': 'none'
		})
		$('.typewriter-1').removeClass('d-none').addClass('d-block');
	}, 5000);
	setInterval(function() {
		$('.typewriter-1').css({
			'border': 'none'
		})
		$('.typewriter-2').removeClass('d-none').addClass('d-block');
	}, 10000);
	setInterval(function() {
		$('.typewriter-2').css({
			'border': 'none'
		})
		$('.typewriter-3').removeClass('d-none').addClass('d-block');
	}, 15000);
	setInterval(function() {
		$('.icons').removeClass('d-none').addClass('d-block');
	}, 19000);

	// function call for visuals
	// lifeCycle();
	skillsArcs();
});