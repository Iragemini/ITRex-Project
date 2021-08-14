import { getReasonPhrase } from 'http-status-codes';

export default class ApiError extends Error {
  /**
   * @param {string} code - error code
   * @param {string} message - error message
   */
  constructor(code, message = '') {
    super(code);
    this.statusCode = code;
    this.message = message ? message : getReasonPhrase(code);
  }
}
