const Joi = require('joi');

const PostRolesValidator = Joi.object().keys({
  name: Joi.string().not('admin').required(),
}).unknown(false);

module.exports = PostRolesValidator;
