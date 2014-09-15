'use strict';

App.IndexRoute = Ember.Route.extend({
  renderTemplate: function(controller, model) {
    this.render('sidebar', {
      outlet: 'sidebar',
      controller: 'Sidebar'
    });

    this.render('journal', {
      outlet: 'main',
      controller: 'Journal',
      model: this.store.find('entry')
    });
  }
});
