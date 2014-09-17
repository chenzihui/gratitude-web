'use strict';

App.EntriesView = Ember.View.extend({
  templateName: 'entries',

  actions: {
    openCalendar: function() {
      var calendarView = this.createChildView('calendar');
      calendarView.append();
    }
  }
});
