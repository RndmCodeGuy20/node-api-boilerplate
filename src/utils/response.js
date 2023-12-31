/**
 * @description - jsend response, a simple response format for all response types.
 * @return {(function(*, *, *): void)|*}
 */
export const jsresponse = () => {
  return (req, res, next) => {
    res.jsend = {
      success: (data, message = { info: {} }, statusCode = 200) => {
        res.status(statusCode).send({
          status: 'success',
          message,
          data,
        });
      },
      info: (status, statusCode, message, data = null) => {
        res.status(statusCode).send({
          status: status,
          info: message,
          data: data,
        });
      },
      fail: (message, data, errorCode = null, statusCode = 400) => {
        res.status(statusCode).send({
          status: 'fail',
          message,
          errorCode,
          data,
        });
      },
      error: (message, status = 500, reason = null, data = null) => {
        res.status(status).send({
          status: 'error',
          message,
          reason,
          data,
        });
      },
    };
    next();
  };
};
