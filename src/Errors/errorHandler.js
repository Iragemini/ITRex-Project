import { getReasonPhrase } from 'http-status-codes';
import AppError from './AppError.js';

export const handle = (err, req, res, next) => {
  let status = 500;
  let message = getReasonPhrase(status);

  if (err instanceof AppError) {
    status = err.statusCode;
    message = getReasonPhrase(status);
  }
  res.status(status).json({ code: status, message });
  next();
};
