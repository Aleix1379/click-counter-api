import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema(
    {
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
    }
);
