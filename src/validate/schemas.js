import Joi from 'joi';

export const resolutionSchema = Joi.object().keys({
  doctorResolution: Joi.string().required(),
  ttlInput: Joi.string().optional().allow('').min(1),
  ttl: Joi.any(),
});

export const nameSchema = Joi.object({
  name: Joi.string().required(),
});
