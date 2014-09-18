'use strict';

App.EntryController = Ember.ObjectController.extend({
  actions: {
    deleteEntry: function(entry) {
      entry.destroyRecord();
    }
  }
});
