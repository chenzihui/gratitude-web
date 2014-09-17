'use strict';

App.EntriesController = Ember.Controller.extend({
  panelOpened: false,

  actions: {
    toggleMenu: function() {
      var curr = this.get('panelOpened');

      this.set('panelOpened', !curr);
    }
  }
});
