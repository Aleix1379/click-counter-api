"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserModel_1 = require("../models/UserModel");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jwt-simple");
const moment = require("moment");
require('dotenv').config();
let token;
const User = mongoose.model('User', UserModel_1.UserSchema);
class TokenController {
    createToken(req, res) {
        const secret = process.env.SECRET;
        User.findOne({ username: req.body.username }).exec()
            .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user['password'], (err, result) => {
                    if (err) {
                        console.error(JSON.stringify(err, null, 2));
                        res.sendStatus(500);
                    }
                    else if (result) {
                        const dateExpiration = moment().add(1, 'week').unix();
                        let data = {
                            username: user['username'],
                            iat: moment().unix(),
                            exp: dateExpiration
                        };
                        token = jwt.encode(data, secret, 'HS256');
                        res.send({
                            username: user['username'],
                            exp: dateExpiration,
                            token: token
                        });
                    }
                    else if (!result) {
                        res.sendStatus(401);
                    }
                });
            }
            else if (!user) {
                res.sendStatus(401);
            }
        })
            .catch(error => {
            // console.log('error');
            console.log(JSON.stringify(error, null, 2));
            res.status(500).send(error);
        });
        // console.log(JSON.stringify(result, null , 2));
    }
}
exports.TokenController = TokenController;

//# sourceMappingURL=TokenController.js.map
