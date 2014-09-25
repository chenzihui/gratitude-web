'use strict';

App.EntryController = Ember.ObjectController.extend({
  editMode: false,

  init: function() {
    var format    = 'YYYY-M-D',
        today     = moment().format(format),
        createdAt = moment(this.get('createdAt')).format(format);

    this._super();

    if (createdAt == today) {
      this.set('editable', true);
    } else {
      this.set('editable', false);
    }
  },

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
