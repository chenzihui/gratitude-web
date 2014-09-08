'use strict';

App.CalendarView = Ember.View.extend({
  templateName: 'calendar',

  init: function() {
    var controller = App.CalendarController.create();

    this._super();
    this.set('controller', controller);
  },

  test: 'hello world',

  actions: {
    closeModal: function() {
      this.remove();
    }
  }
});
