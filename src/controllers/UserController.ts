import * as mongoose from 'mongoose';
import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt-nodejs';
import {UserSchema} from '../models/UserModel';
import {User} from '../interfaces/user';

const UserModel = mongoose.model('User', UserSchema);

export class UserController {

    public createUser(req: Request, res: Response): void {
        bcrypt.hash(req.body.password, null, null, function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    res.status(500);
                    res.send('Error hash password');
                } else {
                    UserModel.create(
                        {
                            username: req.body.username,
                            password: hash
                        }
                    )
                        .then(result => {
                            const userCreated = {...result.toObject()};
                            res.json({username: userCreated['username']});
                        })
                        .catch(err => {
                            if (err.code === 11000) {
                                res.statusCode = 400;
                                return res.send({errorCode: err.code});
                            } else {
                                res.statusCode = 500;
                                return res.send(err);
                            }
                        });
                }
            }
        );

    }
}
