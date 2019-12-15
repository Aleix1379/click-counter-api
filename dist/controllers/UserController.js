"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const UserModel_1 = require("../models/UserModel");
const UserModel = mongoose.model('User', UserModel_1.UserSchema);
class UserController {
    createUser(req, res) {
        bcrypt.hash(req.body.password, null, null, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.status(500);
                res.send('Error hash password');
            }
            else {
                UserModel.create({
                    username: req.body.username,
                    password: hash
                })
                    .then(result => {
                    const userCreated = Object.assign({}, result.toObject());
                    res.json({ username: userCreated['username'] });
                })
                    .catch(err => {
                    if (err.code === 11000) {
                        res.statusCode = 400;
                        return res.send({ errorCode: err.code });
                    }
                    else {
                        res.statusCode = 500;
                        return res.send(err);
                    }
                });
            }
        });
    }
}
exports.UserController = UserController;

//# sourceMappingURL=UserController.js.map
