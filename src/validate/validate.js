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
