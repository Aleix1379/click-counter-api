"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    username: {
        type: String,
        minlength: 2,
        unique: true
    },
    password: {
        type: String
    },
    lastTimeClicked: {
        type: String,
        default: null
    }
});

//# sourceMappingURL=UserModel.js.map
