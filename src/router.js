'use strict';

App.Router.map(function() {
  this.resource('journal', { path: '/' }, function() {
    this.resource('entries', { path: '/journal/:year/:month/:day' }, function() {
      this.route('calendar');
    });
  });
});

App.JournalRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('entry');
  },

  actions: {
    openCalendar: function() {
      return this.render('entries/calendar', {
        into: 'journal',
        outlet: 'modal'
      });
    },

    closeCalendar: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'journal'
      });
    }
  }
});

App.JournalIndexRoute = Ember.Route.extend({
  controllerName: 'entriesIndex',

  model: function() {
    var format = 'YYYY-M-D',
        today  = moment().format(format),

        createdAt;

    return this.modelFor('journal').filter(function(entry) {
      createdAt = moment(entry.get('createdAt')).format(format);
      return createdAt == today;
    });
  },

  setupController: function(controller, model) {
    var today = moment().format('dddd, MMMM Do YYYY');

    this._super(controller, model);
    controller.set('currentDate', today);
    controller.set('isPresent', true);
  },

  renderTemplate: function(controller, model) {
    this.render('entries/index', { controller: controller, model: model });
  }
});

App.EntriesRoute = Ember.Route.extend({
  model: function(params) {
    var date      = new Date(params.year, params.month - 1, params.day),
        format    = 'YYYY-M-D',
        formatted = moment(date).format(format),

        model     = this.modelFor('journal');

    return model.filter(function(entry) {
      return moment(entry.get('createdAt')).format(format) == formatted
    }).set('currentDate', moment(date).format('dddd, MMMM Do YYYY'));
  }
});

App.EntriesIndexRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('entries');
  },

  setupController: function(controller, model) {
    var currentDate = model.get('currentDate');

    this._super(controller, model);
    controller.set('currentDate', currentDate);
    controller.set('isPresent', false);
  },

  renderTemplate: function(controller) {
    this.render('entries/index', { controller: controller });
  }
});
