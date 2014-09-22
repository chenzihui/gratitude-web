'use strict';

App.EntriesController = Ember.ArrayController.extend({

  panelOpened: false,

  months: Ember.computed(function() {
    var all  = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'],

        curr = new Date().getMonth(),
        selectable;

    return all.map(function(mth, index) {
      if (index <= curr) {
        selectable = true;
      } else {
        selectable = false;
      }

      return { name: mth, selectable: selectable, index: index + 1 };
    });
  }),

  actions: {
    toggleMenu: function() {
      var curr = this.get('panelOpened');

      this.set('panelOpened', !curr);
    },

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
