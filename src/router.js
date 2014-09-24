'use strict';

App.Router.map(function() {
  this.resource('entries', { path: '/' }, function() {
    this.route('detail', { path: ':year/:month/:day' });
  });
});

App.ApplicationRoute = Ember.Route.extend({
  actions: {
    openCalendar: function() {
      return this.render('entries/calendar', {
        into: 'application',
        outlet: 'modal'
      });
    },

    closeCalendar: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});

App.EntriesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('entry');
  }
});

App.EntriesIndexRoute = Ember.Route.extend({
  model: function() {
    var format = 'YYYY-M-D',
        today  = moment().format(format),

        createdAt;

    return this.modelFor('entries').filter(function(entry) {
      createdAt = moment(entry.get('createdAt')).format(format);
      return createdAt == today;
    });
  },

  setupController: function(controller, model) {
    var today = moment().format('dddd, MMMM Do YYYY');

    this._super(controller, model);
    controller.set('currentDate', today);
  },

  renderTemplate: function(controller, model) {
    this.render('entries/index', { controller: controller, model: model });
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
