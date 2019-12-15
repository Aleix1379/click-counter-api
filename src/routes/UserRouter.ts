import {Router} from 'express';
import {UserController} from '../controllers/UserController';

export class UserRouter {
    userController: UserController = new UserController();
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init(): void {
        this.router.post('/', this.userController.createUser);
    }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;
