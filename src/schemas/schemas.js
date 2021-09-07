import Joi from 'joi';
import config from '../../config/config.js';

const {
  auth: { MIN_PASSWORD_LENGTH },
} = config;

export const resolutionSchema = Joi.object().keys({
  resolution: Joi.string().required(),
  ttl: Joi.string().optional().allow('').min(1),
});

export const nameSchema = Joi.object({
  name: Joi.string().required(),
});

export const userSchema = Joi.object()
  .options({ abortEarly: false, allowUnknown: true })
  .keys({
    name: Joi.string().alphanum().min(3).max(30)
      .required(),
    gender: Joi.string().required().allow('male', 'female'),
    birthDate: Joi.date().raw().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(MIN_PASSWORD_LENGTH)
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  });

export const userLogInSchema = Joi.object()
  .options({ abortEarly: false, allowUnknown: true })
  .keys({
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(MIN_PASSWORD_LENGTH)
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });

export const bodySchema = Joi.object().min(1);
