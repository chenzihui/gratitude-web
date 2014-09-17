'use strict';

App.Router.map(function() {
  this.resource('entries', { path: '/' }, function() {
    // Nested routes go here
  });
});

App.EntriesIndexRoute = Ember.Route.extend({
  renderTemplate: function(controller, model) {
    this.render('entries/sidebar', {
      outlet: 'sidebar',
      controller: 'Sidebar'
    });

    this.render('entries/index', {
      outlet: 'main',
      controller: 'Journal',
      model: this.store.find('entry')
    });
  }
});
