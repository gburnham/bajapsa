(function ($) {
  $(window).load(function() {

    /* Navigation */

    $('#main-menu > nav > ul').superfish({
      delay:       500,                // 0.1 second delay on mouseout
      animation:   { opacity:'show',height:'show'},  // fade-in and slide-down animation
      dropShadows: true                // disable drop shadows
    });

    $('#main-menu > nav > ul').mobileMenu({
      prependTo:'.mobilenavi',
      groupPageText: Drupal.t('Main'),
      topOptionText: Drupal.t('Select a page')
    });

	// show/hide sections of the main committee pages (for committee members only)
        $(".committeetrigger").click(function() {
                var showDiv = "#committee" + $(this).attr("data-id");
                $("#committeegettingstarted").hide();
                $("#committeeoverview").hide();
                $("#committeedocuments").hide();
                $(showDiv).show();
        });

	// show the proper div on page load
	// if there's a "page=" in the query string, we're in the documents
	// 	div
        var queryString = window.location.search;
        $("#committeegettingstarted").hide();
        if (queryString.indexOf("page") == -1) {
                $("#committeedocuments").hide();
        }
        else {
                $("#committeeoverview").hide();
        }

	// remove the &nbsp; from the font awesome elements
	$(".fa").each(function(index, element) {
		if ($(element).html() == "&nbsp;") {
			$(element).html("");
		}
	}

        // seeing if we need to check the box for events with signups
        if ($("#ba_event_signup").length) {
                var uid = $("#ba_event_signup").attr("data-uid");
                var nid = $("#ba_event_signup").attr("data-nid");
                $.get("http://dev.apsacentral.ca/data.php?mode=signout&uid=" + uid + "&nid=" + nid, function(data) {
                        console.log(data);
                        if (data == true) {
                                $("#ba_event_signup").prop("checked", true);
				$("#modal-body-text").html("You've cancelled your signup. Do you want a cancelation email?");
                        }
                });
        }
        $(".apsa-event-email").click(function() {
                var uid = $("#ba_event_signup").attr("data-uid");
                var nid = $("#ba_event_signup").attr("data-nid");
                var checked = $("#ba_event_signup").prop("checked");
                var email = $(this).attr("data-send-email");
                if (checked) {
                        $("#modal-body-text").html("You've cancelled your signup. Do you want a cancellation email?");
                }
                else {
                        $("#modal-body-text").html("You've signed up for the event! Do you want email with a calendar attachment?");
                }


                // make ajax call passing these parameters and that php file will set the database stuff
                $.get("http://dev.apsacentral.ca/data.php?mode=signup&uid=" + uid + "&nid=" + nid + "&status=" + checked + "&email=" + email, function(data) {
                });
        });


  });
})(jQuery);

( function() {
  var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
      is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
      is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

  if ( ( is_webkit || is_opera || is_ie ) && 'undefined' !== typeof( document.getElementById ) ) {
    var eventMethod = ( window.addEventListener ) ? 'addEventListener' : 'attachEvent';
    window[ eventMethod ]( 'hashchange', function() {
      var element = document.getElementById( location.hash.substring( 1 ) );

      if ( element ) {
        if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) )
          element.tabIndex = -1;

        element.focus();
      }
    }, false );
  }
})();

function activateMenu(menuName)
{
        var activeClass = "c-menu-main__item--active-trail";
        jQuery("a").each(function(index) {
                if (jQuery(this).hasClass("c-menu-main__item") && (jQuery(this).text() == menuName)) {
                        jQuery(this).addClass(activeClass);
                }
        });
}

