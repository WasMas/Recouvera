const Joi = require("joi");

const createPaymentValidator = Joi.object({
  invoice: Joi.string()
    .required(),

  amount: Joi.number()
    .positive()
    .required(),

  method: Joi.string()
    .optional(),

  note: Joi.string()
    .optional()
});

module.exports = {
  createPaymentValidator
};