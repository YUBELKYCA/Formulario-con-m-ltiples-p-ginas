$(document).ready(function () {
    $('ul.tabs li a:first').addClass('active');
    $('.contenedor section').hide();
    $('.contenedor section:first').show();
    $('ul.tabs li a').click(function () {
        $('ul.tabs li a').removeClass('active');
        $(this).addClass('active');
        $('.contenedor section').hide();
        let activeT = $(this).attr('href');
        $(activeT).show();
        return false;
    });
});


