const Bookshelf = require('../config/bookshelf');
const R = require('ramda');
const string = require('underscore.string');

const mapKeys = R.curry((fn, obj) =>
  R.fromPairs(R.map(R.adjust(fn, 0), R.toPairs(obj))));

module.exports = Bookshelf.Model.extend({
  hasTimestamps: true,
  // convert snake_case to camelCase
  parse: attrs => mapKeys(string.camelize, attrs),

  // convert camelCase to snake_case
  format: attrs => mapKeys(string.underscored, attrs),
});
