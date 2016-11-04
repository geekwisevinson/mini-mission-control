const Joi = require('joi');

const PostUsersValidator = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .options({ language: { any: { allowOnly: 'must match password' } } })
    .strip(),
}).unknown(false);

module.exports = PostUsersValidator;
