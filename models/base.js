const Bookshelf = require('../config/bookshelf');
const R = require('ramda');
const string = require('underscore.string');
const Hashids = require('hashids');

const hashids = new Hashids(process.env.HASHIDS_SECRET_KEY);
const encodeKey = (key) => hashids.encode(key) || key;
const decodeKey = (key) => hashids.decode(key)[0] || null;

const getIdKeys = (obj) => R.filter(R.test(/id/i), R.keys(obj));
const hasKeys = (keys) => R.gt(R.length(keys), 0);
const transformHashedKeys = (object, hashKeys, hashFunction) =>
  R.zipObj(hashKeys, R.map(hashFunction, R.props(hashKeys, object)));

const mapKeys = R.curry((fn, obj) =>
  R.fromPairs(R.map(R.adjust(fn, 0), R.toPairs(obj))));

const parseExistingModel = (context, { attributes }) =>
  new context.constructor(attributes, { parse: true });

module.exports = Bookshelf.Model.extend({
  hasTimestamps: true,
  // convert snake_case to camelCase
  parse: (attrs) => {
    const camelizedObject = mapKeys(string.camelize, attrs);

    const idKeys = getIdKeys(camelizedObject);
    if (hasKeys(idKeys)) {
      return R.merge(
        camelizedObject,
        transformHashedKeys(camelizedObject, idKeys, encodeKey)
      );
    }
    return camelizedObject;
  },

  // convert camelCase to snake_case
  format: (attrs) => {
    const underscoredObject = mapKeys(string.underscored, attrs);

    const idKeys = getIdKeys(underscoredObject);
    if (hasKeys(idKeys)) {
      return R.merge(
        underscoredObject,
        transformHashedKeys(underscoredObject, idKeys, decodeKey)
      );
    }
    return underscoredObject;
  },

  save(...args) {
    this.id = decodeKey(this.id);
    return Bookshelf.Model.prototype.save.apply(this, args)
      .then((model) => {
        if (!model) {
          return parseExistingModel(this, model);
        }

        return model.clear()
          .fetch()
          .then(refreshedModel => parseExistingModel(this, refreshedModel))
          .catch(err => {
            console.error('Post-save fetch error');
            throw err;
          });
      });
  },

  destroy(...args) {
    this.id = decodeKey(this.id);
    return Bookshelf.Model.prototype.destroy.apply(this, args);
  },

  forge(attributes, options) {
    const args = [attributes, R.merge(options || {}, { parse: true })];
    return Bookshelf.Model.prototype.forge.apply(this, args);
  },
});
