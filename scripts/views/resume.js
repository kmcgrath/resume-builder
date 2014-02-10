define(['backbone','underscore.string','backbone.marionette'], function(Backbone,_s) {
  return Backbone.Marionette.ItemView.extend({
    template: '#template-app',
    onRender: function() {
      var $e = this.$el;
      var $topHeader = $e.find('h1').first();

      // Setup Magellan
      var $magellanLinks = $('<div class="nav-links"></div>');
      $magellanLinks.append('<dl class="sub-nav"></dl>');

      $e.find('h1,h2').each(function(i,$ele) {
        var name = _s.slugify($(this).text());
        var $anchor = $('<a></a>');
        $anchor.attr('name',name);
        $(this).before($('<p></p>').append($anchor));

        $(this).attr('data-magellan-destination',name);
        var $dd = $('<dd></dd>');
        var $link = $('<a></a>');

        $link.click(function() {
          $('html,body').animate({
            scrollTop: $('a[name='+name+']').offset().top - 80
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
