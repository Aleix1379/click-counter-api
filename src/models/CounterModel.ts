import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CounterSchema = new Schema(
    {
        value: {
            type: Number,
            default: 0
        }
    }
);
