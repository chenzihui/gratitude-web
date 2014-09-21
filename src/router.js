'use strict';

App.Router.map(function() {
  this.resource('entries', { path: '/' }, function() {
    this.route('detail', { path: ':year/:month/:day' });
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

App.EntriesDetailRoute = Ember.Route.extend({
  controllerName: 'entries',

  model: function(params) {
    var date      = new Date(params.year, params.month - 1, params.day),
        format    = 'YYYY-M-D',
        formatted = moment(date).format(format),

        model     = this.modelFor('entries');

    model.set('currentDate', moment(date).format('dddd, MMMM Do YYYY'));

    return model.filter(function(entry) {
      return moment(entry.get('createdAt')).format(format) == formatted
    });
  },

  setupController: function(controller, model) {
    var currentDate = this.modelFor('entries').get('currentDate');

    this._super(controller, model);
    controller.set('currentDate', currentDate);
  },

  renderTemplate: function(controller) {
    this.render('entries/index', { controller: controller });
  }
});
