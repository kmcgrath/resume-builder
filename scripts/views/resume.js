define([
  'jquery',
  'backbone',
  'underscore.string',
  'backbone.marionette'
], function(
  $,
  Backbone,
  _s
) {
  return Backbone.Marionette.ItemView.extend({
    template: '#template-app',
    onRender: function() {
      var $e = this.$el;
      var $topHeader = $e.find('h1').first();

      // Setup Magellan
      var $magellanLinks = $('<div class="nav-links"></div>');
      var $smallToggle = $('<i class="fi-plus show-for-small"></i>');
      $magellanLinks.append($smallToggle);
      $magellanLinks.append('<dl class="sub-nav hide-for-small"></dl>');

      $smallToggle.click(function() {
        var navHeight;
        var padding;

        if ($(this).hasClass('fi-plus')) {
          padding = parseInt($('#app').css('padding-top').replace("px", ""));
          $(this).removeClass('fi-plus');
          $(this).addClass('fi-minus');
          $magellanLinks.find(".sub-nav").removeClass('hide-for-small');
          navHeight = $magellanLinks.find(".sub-nav").height();
          $('#app').animate({
            'padding-top': padding + navHeight
          }, 500);
        }
        else {
          navHeight = $magellanLinks.find(".sub-nav").height();
          $(this).removeClass('fi-minus');
          $(this).addClass('fi-plus');
          $magellanLinks.find(".sub-nav").addClass('hide-for-small');
          padding = parseInt($('#app').css('padding-top').replace("px", ""));
          console.log(navHeight);
          $('#app').animate({
            'padding-top': padding-navHeight
          }, 500);
        }
      });


      $e.find('h1,h2').each(function(i,$ele) {
        var name = _s.slugify($(this).text());
        var $anchor = $('<a></a>');
        $anchor.attr('name',name);
        $(this).before($('<p></p>').append($anchor));

        $(this).attr('data-magellan-destination',name);
        var $dd = $('<dd></dd>');
        var $link = $('<a></a>');

        $link.click(function() {
          var navHeight = $('#app .nav-links').height();
          $('html,body').animate({
            scrollTop: $('a[name='+name+']').offset().top - (navHeight + 30)
          }, 1000);
        });

        $link.click(function() {
          $('a[name='+name+']').scroll();
        });

        $link.text($(this).text());
        $dd.attr('data-magellan-arrival',name);
        $dd.append($link);

        $magellanLinks.find('dl').append($dd);
      });
      $topHeader.before($magellanLinks);

      var $footer = $('<div id="footer"></div>');
      $footer.append('<a onClick="window.print()"><i class="fi-print"></i></a>');
      $footer.append('<a href="resume.md"><i class="fi-page-export"></i></a>');
      $footer.append('<a href="resume.pdf"><i class="fi-page-export-pdf"></i></a>');
      $footer.append('<a href="https://github.com/kmcgrath/resume"><i class="fi-social-github"></i></a>');
      $e.append($footer);

      var $spacer = $('<div id="bottom-spacer"></div>');
      $e.append($spacer);
      $spacer.height($(window).height());
    }
  });
});
