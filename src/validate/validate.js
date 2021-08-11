import AppError from '../Errors/AppError.js';

export const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const statusCode = property === 'body' ? 422 : 400;
      throw new AppError(statusCode);
    } else {
      return next();
    }
  };
};

export const checkTTL = (req, res, next) => {
  const ttl = req.body.ttlInput;
  console.log('ttl', ttl);
  if (ttl) {
    const valid = ttl > 0;
    if (!valid) {
      throw new AppError(400);
    }
    return next();
  }
  return next();
};
