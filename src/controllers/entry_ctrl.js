'use strict';

App.EntryController = Ember.ObjectController.extend({
  editMode: false,

  actions: {
    editEntry: function() {
      this.set('editMode', true);
    },

    saveChanges: function() {
      var entry = this.get('model');

      Ember.isEmpty(this.get('text')) ? this.send('deleteEntry') : entry.save();

      this.set('editMode', false);
    },

    deleteEntry: function() {
      var entry = this.get('model');
      entry.destroyRecord();
    }
  }
});
