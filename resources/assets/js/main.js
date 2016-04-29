$(function () {

    var filterList = {

        init: function () {

            // MixItUp plugin
            $('#project-list').mixItUp({
                effects: ['fade'],
                //easing: 'snap',
                // call the hover effect
                onMixEnd: filterList.hoverEffect()
            });

        },

        hoverEffect: function () {

            // Simple parallax effect
            $('#project-list .project-item').hover(
                function () {
                    $(this).find('.label').stop().animate({bottom: 0}, 200, 'easeOutQuad');
                    $(this).find('img').stop().animate({top: -30}, 200, 'easeOutQuad');
                },
                function () {
                    $(this).find('.label').stop().animate({bottom: -60}, 200, 'easeInQuad');
                    $(this).find('img').stop().animate({top: 0}, 300, 'easeOutQuad');
                }
            );

        }
    };

    //@TODO - Refactor and copy logo
    var stickMenu = {
        init: function(selector) {
            $(selector).addClass('original').clone().insertAfter(selector).addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();
            scrollIntervalID = setInterval(this.stickIt, 10);
        },
        stickIt: function() {

            var orgElementPos = $('.original').offset();
            orgElementTop = orgElementPos.top;

            if ($(window).scrollTop() >= (orgElementTop)) {
                // scrolled past the original position; now only show the cloned, sticky element.

                // Cloned element should always have same left position and width as original element.
                orgElement = $('.original');
                coordsOrgElement = orgElement.offset();
                leftOrgElement = coordsOrgElement.left;
                widthOrgElement = orgElement.css('width');
                $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
                $('.original').css('visibility','hidden');
            } else {
                // not scrolled past the menu; only show the original menu.
                $('.cloned').hide();
                $('.original').css('visibility','visible');
            }
        }

    };

    // Run the show!
    filterList.init();
    stickMenu.init('nav');

    //@TODO - Refactor
    // Cache selectors
    var lastId,
        topMenu = $(".menu"),
        topMenuHeight = topMenu.outerHeight()+15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+20;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=#"+id+"]").parent().addClass("active");
        }
    });

    $("#contactForm").submit(function(event) {

        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $( this ),
            name = $form.find( "input[name='name']" ).val(),
            email = $form.find( "input[name='email']" ).val(),
            message = $form.find( "textarea[name='message']" ).val(),
            url = $form.attr( "action" );

        // Send the data using post
        $.post( url, { name: name, email: email, message: message }, function(data) {
            $(".response").empty().html(data.message);
        });
    });
});