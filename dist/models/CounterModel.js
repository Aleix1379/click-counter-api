"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CounterSchema = new Schema({
    value: {
        type: Number,
        default: 0
    }
});

//# sourceMappingURL=CounterModel.js.map
