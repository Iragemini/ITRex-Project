import { getReasonPhrase } from 'http-status-codes';

export default class ApiError extends Error {
  /**
   * @param {number} code - error code
   * @param {string} message - error message
   */
  constructor(code, message = null) {
    super(code);
    this.statusCode = code;
    this.message = message ?? getReasonPhrase(code);
  }
}
