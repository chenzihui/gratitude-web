'use strict';

App.Entry = DS.Model.extend({
  text: DS.attr('string'),

  createdAt: DS.attr('date', {
    defaultValue: moment().format()
  }),

  updatedAt: DS.attr('date', {
    defaultValue: moment().format()
  })
});

App.Entry.FIXTURES = [
  {
    id: 1,
    text: 'Grateful to be in good health',
    createdAt: moment().format(),
    updatedAt: moment().format()
  },

  {
    id: 2,
    text: 'Thankful for having internet access',
    createdAt: moment().format(),
    updatedAt: moment().format()
  },

  {
    id: 3,
    text: 'Thankful for living in peaceful times',
    createdAt: moment().format(),
    updatedAt: moment().format()
  },

  {
    id: 4,
    text: 'This is in the past',
    createdAt: moment().subtract(7, 'days').format(),
    updatedAt: moment().subtract(7, 'days').format()
  },

  {
    id: 5,
    text: 'Another in the past',
    createdAt: moment().subtract(5, 'days').format(),
    updatedAt: moment().subtract(5, 'days').format()
  }
];
