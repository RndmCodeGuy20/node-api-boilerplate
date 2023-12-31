import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ERROR_CODES } from '#constants/index';

/**
 * Error Middleware for NotAllowed
 */
class MethodNotAllowedError extends Error {
  /**
	 * @param {string} message
	 * @param {number} httpStatus
	 * @param {string} errorCode
	 */
  constructor(message, httpStatus, errorCode) {
    super(message);
    this.name = 'MethodNotAllowedError';
    this.status = httpStatus;
    this.errorCode = errorCode;
  }
}

/**
 * Error Middleware for RouteNotFound
 */
export const methodNotAllowed = () => {
  try {
    throw new MethodNotAllowedError(
        ReasonPhrases.METHOD_NOT_ALLOWED,
        StatusCodes.METHOD_NOT_ALLOWED,
        ERROR_CODES.NOT_ALLOWED,
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Error Middleware for RouteNotFound
 * @param {string} message
 * @param {number} httpStatus
 * @param {string} errorCode
 * @return {Error}
 */
class RouteNotFoundError extends Error {
  /**
	 * @param {string} message
	 * @param {number} httpStatus
	 * @param {string} errorCode
	 */
  constructor(message, httpStatus, errorCode) {
    super(message);
    this.name = 'RouteNotFoundError';
    this.status = httpStatus;
    this.errorCode = errorCode;
  }
}

/**
 * Error Middleware for RouteNotFound
 */
export const routeNotFound = () => {
  try {
    throw new RouteNotFoundError(
        ReasonPhrases.NOT_FOUND,
        StatusCodes.NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
    );
  } catch (error) {
    throw error;
  }
};
