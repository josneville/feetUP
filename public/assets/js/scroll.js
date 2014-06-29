$(".aboutMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#about").offset().top - 25
    }, 1000);
});

$(".teamMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#team").offset().top - 25
    }, 1000);
});

$(".connectMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#connect").offset().top - 25
    }, 1000);
});

$(".homeMenu").click(function() {
    $('html, body').animate({
        scrollTop: $("#home").offset().top - 25
    }, 1000);
});
