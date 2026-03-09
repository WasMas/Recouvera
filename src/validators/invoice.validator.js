const Joi = require("joi");

const createInvoiceValidator = Joi.object({
  client: Joi.string()
    .required(),

  amount: Joi.number()
    .positive()
    .required(),

  dueDate: Joi.date()
    .required(),

  status: Joi.string()
    .valid("pending", "partial", "paid", "overdue")
    .optional()
});

module.exports = {
  createInvoiceValidator
};