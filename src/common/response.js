const createError = require('http-errors');

module.exports = {
    succes: (res, status = 200, message = 'Ok', results = {}) => {
        res.status(status).json({ message, results });
    },
    error: (res, error = null) => {
        const { statusCode, message } = error ? error : new createError.InternalServerError();
        res.status(statusCode).json({ message });
    }
}