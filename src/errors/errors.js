const errors = {};

errors.successOk = {
    statusCode: 200,
    info: 'success ok'
};
errors.internalErr = {
    statusCode: 500,
    info: 'internal err'
};
errors.notFount = {
    statusCode : 404,
    info : 'not fount'
};
errors.unauthorized = {
    statusCode : 401,
    info : 'not authorized'
}

module.exports = errors;