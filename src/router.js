'use strict';

App.Router.map(function() {
  this.resource('entries', { path: '/' }, function() {
    // Nested routes
  });
});

App.EntriesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('entry');
  }
})

App.EntriesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('entries')
  },

  renderTemplate: function() {
    var controller = this.controllerFor('entries');
    this.render('entries/index', { controller: controller });
  }
});
