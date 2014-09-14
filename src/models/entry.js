'use strict';

App.Entry = DS.Model.extend({
  text: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});

App.Entry.FIXTURES = [
  {
    id: 1,
    text: 'Grateful to be in good health',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: 2,
    text: 'Thankful for having internet access',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: 3,
    text: 'Thankful for living in peaceful times',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
