import Joi from 'joi';

import { emailRegex } from '../constants/user-constants.js';

const userSignupSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    subscription: Joi.string(),
});

const userLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
})

const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
})

export default {userSignupSchema, userLoginSchema, userEmailSchema};