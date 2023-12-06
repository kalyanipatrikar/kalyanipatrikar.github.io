$(document).ready(function() {
    var layout   = $('#layout'),
        menu     = $('#menu'),
        menuLink = $('#menuLink'),
        content  = $('#main');

    function toggleAll() {
        layout.toggleClass('active');
        menu.toggleClass('active');
        menuLink.toggleClass('active');
    }

    menuLink.on('click', function(e) {
        toggleAll();
        if (menu.hasClass('active')) {
            $('#page').css('margin-left', '275px');
        } else {
            $('#page').css('margin-left', '');
        }
    });

    content.on('click', function(e) {
        if (menu.hasClass('active')) {
            toggleAll();
        }
    });
});
