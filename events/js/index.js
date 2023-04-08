$("document").ready(function() {
    var offset = 600,
        duration = 400;

    $("#carouselDarkVariant").carousel();
    $(".carousel-item").click(function() {
        $("#carouselDarkVariant").carousel(1);
    });

    // Enable Carousel Controls
    $(".carousel-control-next").click(function() {
        $("#carouselDarkVariant").carousel("prev");
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
        $('html, body').animate({
            scrollTop: 0
        }, duration, "linear");
        return false;
    });
});