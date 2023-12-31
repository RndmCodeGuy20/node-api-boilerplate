import Joi from 'joi';
import { pick } from '#utils/pick';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * @class ValidationMiddlewareError
 * @extends Error
 * @param {string} message
 * @param {StatusCodes.BAD_REQUEST} statusCode
 * @param {string} reason
 * @constructor
 * @description
 */
class ValidationMiddlewareError extends Error {
  /**
	 *
	 * @param {string} message
	 * @param {StatusCodes.BAD_REQUEST} statusCode
	 * @param {string} reason
	 */
  constructor(message, statusCode, reason) {
    super(message);
    this.name = 'ValidationMiddlewareError';
    this.statusCode = statusCode;
    this.reason = reason;
  }
}

/**
 * @function validateSchema
 *
 * @param {object} schema
 * @return {(function(*, *, *): (*))|*}
 */
export const validateSchema = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
      .prefs({
        errors: { label: 'key', wrap: { label: 'a' } },
        abortEarly: false,
      })
      .validate(object);

  if (error) {
    const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
    return next(
        new ValidationMiddlewareError(
            errorMessage,
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST,
        ),
    );
  }

  Object.assign(req, value);
  return next();
};
