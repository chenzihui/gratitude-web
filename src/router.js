'use strict';

App.IndexRoute = Ember.Route.extend({
  renderTemplate: function(model, controller) {
    this.render('sidebar', { outlet: 'sidebar' });
    this.render('journal', { outlet: 'main' });
  }
});
