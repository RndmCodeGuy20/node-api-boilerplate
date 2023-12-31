/**
 * SocketApiError
 * @class
 * @extends Error
 * @param {string} message - Error message
 * @param {number} httpStatus - HTTP status code
 * @param {string} errorCode - Error code
 * @memberof SocketApiError
 */
class SocketApiError extends Error {
  /**
	 * @constructor
	 * @param {string} message - Error message
	 * @param {number} httpStatus - HTTP status code
	 * @param {string} errorCode - Error code
	 * @memberof SocketApiError
	 */
  constructor(message, httpStatus, errorCode) {
    super(message);
    this.name = 'SocketApiError';
    this.status = httpStatus;
    this.errorCode = errorCode;
  }
}

export { SocketApiError };
