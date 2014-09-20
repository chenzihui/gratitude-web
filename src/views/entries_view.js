'use strict';

App.EntriesView = Ember.View.extend({
  templateName: 'index',

  actions: {
    openCalendar: function() {
      var calendarView = this.createChildView('calendar');
      calendarView.append();
    }
  }
});
