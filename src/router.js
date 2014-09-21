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
});

App.EntriesIndexRoute = Ember.Route.extend({
  model: function() {
    var today = moment().format();

    return this.modelFor('entries').filter(function(entry) {
      return entry.get('createdAt') == today;
    });
  },

  setupController: function(controller, model) {
    var today = moment().format('dddd, MMMM Do YYYY');

    this._super(controller, model);
    controller.set('currentDate', today);
  },

  renderTemplate: function(controller) {
    this.render('entries/index', { controller: controller });
  }
});
