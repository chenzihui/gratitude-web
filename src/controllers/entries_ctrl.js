'use strict';

App.EntriesController = Ember.ArrayController.extend({

  actions: {
    createEntry: function() {
      var text = this.get('newEntry').trim(),

          entry;

      if (!text) { return false; }

      entry = this.store.createRecord('entry', {
        text: text
      });

      this.set('newEntry', '');

      entry.save();
    }
  }

});
