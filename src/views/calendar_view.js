'use strict';

App.CalendarView = Ember.View.extend({
  templateName: 'entries/calendar',

  init: function() {
    var controller = App.CalendarController.create();

    this._super();
    this.set('controller', controller);
  },

  actions: {
    closeModal: function() {
      this.remove();
    }
  }
});
