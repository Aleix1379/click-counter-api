import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import CounterRouter from './routes/CounterRouter';
import UserRouter from './routes/UserRouter';
import TokenController from './routes/TokenController';
import requestEnsureAuth = require('./middlewares/auth');
import requestLogger = require('./middlewares/logger');
const helmet = require('helmet');
// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
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
    private routes(): void {
        this.express.use('/api/v1/counter', CounterRouter);
        this.express.use('/api/v1/users', UserRouter);
        this.express.use('/api/v1/tokens', TokenController);
    }

}

export default new App().express;
