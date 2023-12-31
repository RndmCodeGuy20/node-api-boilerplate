import { StatusCodes } from 'http-status-codes';

/**
 * @class AuthenticationMiddlewareError
 */
class AuthenticationMiddlewareError extends Error {
  /**
	 *
	 * @param {string} message
	 * @param {StatusCodes.UNAUTHORIZED} httpStatus
	 * @param {string} errorCode
	 */
  constructor(message, httpStatus, errorCode) {
    super(message);
    this.name = 'AuthenticationMiddlewareError';
    this.status = httpStatus;
    this.errorCode = errorCode;
  }
}

export const validateSocketUser = (socket, next) => {
  try {
    console.log('connection request', socket.handshake.headers.user_id);
    if (!socket.handshake.headers.authorization) {
      throw new AuthenticationMiddlewareError(
          'Authorization header not present',
          StatusCodes.UNAUTHORIZED,
          'UNAUTHENTICATED',
      );
    }

    // if (!socket.handshake.headers.authorization.startsWith('Bearer')) {
    //   throw new AuthenticationMiddlewareError(
    //       'Invalid authentication header type',
    //       StatusCodes.BAD_REQUEST,
    //       'INVALID',
    //   );
    // }

    // const token = socket.handshake.headers.authorization.split(' ')[1];
    // console.log(token);
    // const tokenData = verifyToken(token);
    // socket.user = tokenData.data;
    // console.log(token);

    next();
  } catch (error) {
    next(error);
  }
};
