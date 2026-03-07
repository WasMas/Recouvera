const Joi = require("joi");

const clientValidator = Joi.object({
  name: Joi.string().min(4).max(100).required(),

  email: Joi.string()
    .email()
    .optional(),

  phone: Joi.string()
    .min(6)
    .max(20)
    .optional(),

  address: Joi.string()
    .max(200)
    .optional(),

  company: Joi.string()
    .max(100)
    .optional()
});

module.exports = {
  clientValidator
};