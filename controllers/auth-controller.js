import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import "dotenv/config";

import User from '../models/user.js';

import cnrWrapper from '../decorators/cnrWrapper.js';

import HttpError from '../helpers/HttpError.js';

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, 'This email already used')
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});
    res.status(201).json({
        email: newUser.email
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "email or password is wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "email or password is wrong")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    res.json({
        token,
    })
}

export default {
    signup: cnrWrapper(signup),
    signin: cnrWrapper(signin), 
}