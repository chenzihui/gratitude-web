'use strict';

App.IndexRoute = Ember.Route.extend({
  renderTemplate: function(controller, model) {
    var sidebarCtrl = App.SidebarController.create(),
        journalCtrl = App.JournalController.create();

    journalCtrl.set('content', this.store.find('entry'));

    this.render('sidebar', {
      outlet: 'sidebar',
      controller: sidebarCtrl
    });

    this.render('journal', {
      outlet: 'main',
      controller: journalCtrl
    });
  }
});
