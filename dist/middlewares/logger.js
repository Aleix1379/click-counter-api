"use strict";
const requestLogger = (request, response, next) => {
    console.info(`${(new Date()).toUTCString()}|${request.method}|${request.url}|${request.ip}`);
    next();
};
module.exports = requestLogger;

//# sourceMappingURL=logger.js.map
