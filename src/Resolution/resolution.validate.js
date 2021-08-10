import Joi from 'joi';
import { checkTTL } from '../utils/check.js';

export const resolutionSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    resolution: Joi.string().required(),
    ttl: Joi.string.custom(checkTTL, 'check TTL value'),
  });
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
};
