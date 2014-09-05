'use strict';

App.CalendarView = Ember.View.extend({
  templateName: 'calendar',

  actions: {
    closeModal: function() {
      this.remove();
    }
  }
});
