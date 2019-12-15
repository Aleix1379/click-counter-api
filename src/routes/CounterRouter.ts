import {Router} from 'express';
import {CounterController} from '../controllers/CounterController';


export class CounterRouter {
    counterController: CounterController = new CounterController();
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init(): void {
        this.router.get('/', this.counterController.getCurrentCounterValue);
        this.router.put('/', this.counterController.updateCounterValue);
    }
}

const counterRoutes = new CounterRouter();
counterRoutes.init();

export default counterRoutes.router;
