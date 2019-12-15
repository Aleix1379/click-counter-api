"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CounterController_1 = require("../controllers/CounterController");
class CounterRouter {
    constructor() {
        this.counterController = new CounterController_1.CounterController();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', this.counterController.getCurrentCounterValue);
        this.router.put('/', this.counterController.updateCounterValue);
    }
}
exports.CounterRouter = CounterRouter;
const counterRoutes = new CounterRouter();
counterRoutes.init();
exports.default = counterRoutes.router;

//# sourceMappingURL=CounterRouter.js.map
