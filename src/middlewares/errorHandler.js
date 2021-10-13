import { getReasonPhrase } from 'http-status-codes';
import ApiError from '../errors/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = getReasonPhrase(status);

  if (err instanceof ApiError) {
    status = err.statusCode;
    message = err.message;
  }
  res.status(status).json({ code: status, message });
};

export default errorHandler;
