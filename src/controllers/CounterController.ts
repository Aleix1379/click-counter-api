import * as mongoose from 'mongoose';
import {Request, Response} from 'express';
import {CounterSchema} from '../models/CounterModel';
import {UserSchema} from "../models/UserModel";
import {Counter} from '../interfaces/counter';
import {User} from '../interfaces/user';
import * as moment from 'moment';

const Counter = mongoose.model('Counter', CounterSchema);
const User = mongoose.model('User', UserSchema);

export class CounterController {

    public getCurrentCounterValue(req: Request, res: Response): void {
        CounterController.getValue(false)
            .then(value => {
                res.json({value});
            })
            .catch(error => {
                console.log(JSON.stringify(error, null, 2));
                res.status(500).send(error);
            });
    }

    public updateCounterValue(req: Request, res: Response): void {
        User.findOne({username: req.body.username}).exec()
            .then(user => {
                const now = moment().toDate().toISOString();
                if (!user['lastTimeClicked']) {
                    CounterController.increaseCounter(user, now, res);
                } else {
                    const diffInHours = CounterController.getDiff(user, now);
                    if (diffInHours < 24) {
                        console.log('You have increased the counter in the last 24 hours');
                        res.status(403).send({message: 'You have increased the counter in the last 24 hours'});
                    } else {
                        CounterController.increaseCounter(user, now, res);
                    }
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error, null, 2));
                res.status(500).send(error);
            });
    }

    private static getDiff(user, now) {
        const date1 = new Date(user['lastTimeClicked']);
        const date2 = new Date(now);
        const diff = date2.valueOf() - date1.valueOf();
         // Convert milliseconds to hours
        return diff / 1000 / 60 / 60;
    }

    private static increaseCounter(user, now, res: Response) {
        const updateCounterPromise = CounterController.getValue(true);
        const updateUserLastTimePromise = CounterController.updateUserLastTime(user.toObject(), now);

        Promise.all([updateCounterPromise, updateUserLastTimePromise])
            .then(results => {
                res.json({value: results[0]});
            })
            .catch(error => {
                console.log(JSON.stringify(error, null, 2));
                res.status(500).send(error);
            });
    }

    /**
     * @param update
     * false: Return the value from the DB if there is no value initialize with 0
     * true: Increase the value + 1 and return the new number
     */
    private static getValue(update: boolean): Promise<number> {
        return new Promise<number>(((resolve, reject) => {
            Counter.findOne({}).exec()
                .then((data) => {
                    if (!data) {
                        Counter.collection.insertOne(
                            {
                                value: 0
                            }
                        )
                            .then(() => {
                                resolve(0);
                            })
                            .catch(error => {
                                console.log(error);
                                reject(error);
                            });
                    } else {
                        if (update) {
                            data['value']++;
                            Counter.update({}, {value: data['value']}).exec()
                                .then(() => {
                                    resolve(data['value']);
                                })
                                .catch(error => {
                                    console.log(error);
                                    reject(error);
                                });
                        } else {
                            console.log('without update');
                            console.log(data);
                            resolve(data['value']);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        }));
    }

    private static updateUserLastTime(user: User, newLastTime: string): Promise<any> {
        user.lastTimeClicked = newLastTime;
        return User.updateOne({username: user.username}, user).exec();
    }

}
