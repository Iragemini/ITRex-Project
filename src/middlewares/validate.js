import ApiError from '../errors/ApiError.js';

export const validator = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) {
    const statusCode = property === 'body' ? 422 : 400;
    throw new ApiError(statusCode);
  } else {
    return next();
  }
};

export const checkTTL = (req, res, next) => {
  let ttl = null;
  if (req.body.ttl) {
    ttl = req.body.ttl;
  }
  if (!ttl) {
    return next();
  }
  const valid = ttl > 0;
  if (!valid) {
    throw new ApiError(400, 'TTL value must be positive numbers only');
  }
  return next();
};
