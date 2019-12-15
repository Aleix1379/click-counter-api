"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
class UserRouter {
    constructor() {
        this.userController = new UserController_1.UserController();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.post('/', this.userController.createUser);
    }
}
exports.UserRouter = UserRouter;
const userRoutes = new UserRouter();
userRoutes.init();
exports.default = userRoutes.router;

//# sourceMappingURL=UserRouter.js.map
