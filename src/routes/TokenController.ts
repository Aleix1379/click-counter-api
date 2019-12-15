import {Router} from 'express';
import {TokenController} from '../controllers/tokenController';

export class TokenRouter {
    tokenController: TokenController = new TokenController();
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init (): void {
        this.router.post('/', this.tokenController.createToken);
    }

}

const tokenRoutes = new TokenRouter();
tokenRoutes.init();

export default tokenRoutes.router;
