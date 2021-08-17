import Joi from 'joi';

export const resolutionSchema = Joi.object().keys({
  resolution: Joi.string().required(),
  ttl: Joi.string().optional().allow('').min(1),
});

export const nameSchema = Joi.object({
  name: Joi.string().required(),
});

export const bodySchema = Joi.object().min(1);
