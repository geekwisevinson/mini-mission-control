const Joi = require('joi');

const PatchUsersValidator = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
})
.or('name', 'email')
.unknown(false);

module.exports = PatchUsersValidator;
