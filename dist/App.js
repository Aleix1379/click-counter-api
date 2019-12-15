"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const CounterRouter_1 = require("./routes/CounterRouter");
const UserRouter_1 = require("./routes/UserRouter");
const TokenController_1 = require("./routes/TokenController");
const requestEnsureAuth = require("./middlewares/auth");
const requestLogger = require("./middlewares/logger");
const helmet = require('helmet');
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(cors());
        this.express.use(helmet());
        this.express.disable('x-powered-by');
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(requestLogger);
        this.express.use(requestEnsureAuth);
    }
    // Configure API endpoints.
    routes() {
        this.express.use('/api/v1/counter', CounterRouter_1.default);
        this.express.use('/api/v1/users', UserRouter_1.default);
        this.express.use('/api/v1/tokens', TokenController_1.default);
    }
}
exports.default = new App().express;

//# sourceMappingURL=App.js.map
