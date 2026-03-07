const Joi = require("joi");

const signupValidator = Joi.object({
  first_name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  last_name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required()
});

const signinValidator = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required()
});

module.exports = {
  signupValidator,
  signinValidator
};