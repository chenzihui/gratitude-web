'use strict';

App.IndexRoute = Ember.Route.extend({
  renderTemplate: function(model, controller) {
    var sidebarCtrl = App.SidebarController.create();

    this.render('sidebar', {
      outlet: 'sidebar',
      controller: sidebarCtrl
    });

    this.render('journal', { outlet: 'main' });
  }
});
