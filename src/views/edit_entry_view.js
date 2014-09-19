'use strict';

App.EditEntryView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-entry', App.EditEntryView);
