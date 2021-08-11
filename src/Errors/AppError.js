import { getReasonPhrase } from 'http-status-codes';

export default class AppError extends Error {
  constructor(code) {
    super(code);
    this.statusCode = code;
    this.message = getReasonPhrase(code);
  }
}
