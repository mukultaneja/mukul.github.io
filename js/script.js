$("document").ready(function(){
	var skills = { 'python' : 0.6, 'dv': 0.3, 'php' : 0.7, 'linux' : 0.5,
				 'db' : 0.5, 'sql' : 0.5, 'js' : 0.7, 'css': 0.4,};

	var colors = ['red', 'orange', 'green', 'blue', 'yellow', 'purple']

	var offset = 600;
	var duration = 300;
	var to_year = new Date().getFullYear();

	$('.sidebar').toggle('slide');
	$('div.copyright center, div.footer footer').html('&copy; Mukul Taneja - ' + to_year);

	$('.skills-link').click(function(e){
		e.preventDefault();
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 800);
	    $.each(skills, function(key, value){
		$('#'+key+'-skill').circleProgress({
	        value: value,
	        size: 120,
	        fill: {
	            gradient: [
	            		colors[Math.floor(Math.random() *colors.length)],
	            		colors[Math.floor(Math.random() *colors.length)]
	            ]
	        }
		});
	});
	    return false;
	});
	$('.about-me-link').click(function(e){
		e.preventDefault();
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 800);
	    return false;
	});
	$('.project-link').click(function(e){
		e.preventDefault();
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 800);
	    return false;
	});

	$('.contact-me-link').click(function(e){
		e.preventDefault();
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 800);
	    return false;
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > offset) {
			$('.back-to-top').fadeIn(duration);
		} else {
			$('.back-to-top').fadeOut(duration);
		}
	});

	$('.back-to-top').click(function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, duration);
		return false;
	});

	$('.sidebar-menu-btn').click(function(){
		$('.sidebar').toggle('slide');
	});
});
