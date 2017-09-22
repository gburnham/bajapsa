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

       // handle the "I will attend this event" check box for signing up to events
        $("#ba_event_signup").change(function() {
                var uid = $("#ba_event_signup").attr("data-uid");
                var nid = $("#ba_event_signup").attr("data-nid");
                var checked = this.checked;

                // make ajax call passing these three parameters and that php file will set the database stuff
                $.get("http://dev.apsacentral.ca/data.php?mode=signup&uid=" + uid + "&nid=" + nid + "&status=" + checked, function(data) {
                });
        });

        // seeing if we need to check the box for events with signups
        if ($("#ba_event_signup").length) {
                var uid = $("#ba_event_signup").attr("data-uid");
                var nid = $("#ba_event_signup").attr("data-nid");
                $.get("http://dev.apsacentral.ca/data.php?mode=signout&uid=" + uid + "&nid=" + nid, function(data) {
                        console.log(data);
                        if (data == true) {
                                $("#ba_event_signup").prop("checked", true);
                        }
                });
        }


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
