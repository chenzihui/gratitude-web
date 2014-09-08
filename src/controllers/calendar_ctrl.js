'use strict';

App.CalendarController = Ember.Controller.extend({

  month: Ember.computed(function() {
    var names = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    return names[new Date().getMonth()];
  }),

  days: Ember.computed(function() {
    var now  = new Date(),
        year = now.getFullYear(),
        mth  = now.getMonth() + 1,

        daysInMth = new Date(year, mth, 0).getDate(),
        days = [], i;

    for (i=1; i<=daysInMth; i++) { days.push(i); }

    return days
  })

});
