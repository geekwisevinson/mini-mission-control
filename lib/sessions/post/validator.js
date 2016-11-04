const Joi = require('joi');

const PostSessionsValidator = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).unknown(false);

module.exports = PostSessionsValidator;
