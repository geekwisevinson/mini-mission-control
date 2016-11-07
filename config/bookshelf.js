module.exports = (() => {
  const knexfile = require('../Knexfile');
  const knex = require('knex')(knexfile);
  const jsonColumns = require('bookshelf-json-columns');
  const bookshelf = require('bookshelf')(knex);

  bookshelf.plugin('registry');
  bookshelf.plugin('visibility');
  bookshelf.plugin(jsonColumns);

  return bookshelf;
})();
