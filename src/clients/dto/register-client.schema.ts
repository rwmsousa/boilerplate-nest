import * as Joi from 'joi';

export const registerClientSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a text',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must be at most {#limit} characters long',
    'any.required': 'Name is required',
  }),
  cpf: Joi.string().length(11).required().messages({
    'string.base': 'CPF must be a text',
    'string.empty': 'CPF cannot be empty',
    'string.length': 'CPF must be exactly {#limit} characters long',
    'any.required': 'CPF is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a text',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  color: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Color must be a text',
    'string.empty': 'Color cannot be empty',
    'string.min': 'Color must be at least {#limit} characters long',
    'string.max': 'Color must be at most {#limit} characters long',
    'any.required': 'Color is required',
  }),
  annotations: Joi.string().allow('').optional().messages({
    'string.base': 'Annotations must be a text',
  }),
});
