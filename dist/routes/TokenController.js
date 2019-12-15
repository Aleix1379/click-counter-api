"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenController_1 = require("../controllers/tokenController");
class TokenRouter {
    constructor() {
        this.tokenController = new tokenController_1.TokenController();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.post('/', this.tokenController.createToken);
    }
}
exports.TokenRouter = TokenRouter;
const tokenRoutes = new TokenRouter();
tokenRoutes.init();
exports.default = tokenRoutes.router;

//# sourceMappingURL=TokenController.js.map
