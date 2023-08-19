import { Schema, model } from 'mongoose';
import {emailRegex} from '../constants/user-constants.js';
import { handleSaveError, handleUpdateValidate} from './hooks.js';

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        match: emailRegex,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
    },
    
}, { versionKey: false, timestemps: true });

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model('user', userSchema);

export default User;