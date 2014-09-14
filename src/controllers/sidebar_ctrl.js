'use strict';

App.SidebarController = Ember.Controller.extend({

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

      return { name: mth, selectable: selectable };
    });
  })
});
