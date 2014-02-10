define([
       'jquery',
       'backbone',
       'views/resume'
],

function($, Backbone, ResumeView) {
  'use strict';

  var App = new Backbone.Marionette.Application();

  App.addRegions({
    app: '#app'
  });

  App.on('initialize:after',function() {
    App.getRegion('app').show(new ResumeView());
    $(document).foundation();
  });


  return App;
});
