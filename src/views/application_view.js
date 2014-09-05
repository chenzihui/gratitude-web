'use strict';

App.ApplicationView = Ember.View.extend({
  templateName: 'application',

  actions: {
    openCalendar: function() {
      var calendarView = this.createChildView('calendar');
      calendarView.append();
    }
  }
});
