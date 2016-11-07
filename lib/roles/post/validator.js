const Joi = require('joi');

const PostRolesValidator = Joi.object().keys({
  name: Joi.string().required(),
}).unknown(false);

module.exports = PostRolesValidator;
