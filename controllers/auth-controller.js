import fs from 'fs/promises';
import path from 'path';
import gravatar from "gravatar";
import Jimp from "jimp";
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import User from '../models/user.js';
import cnrWrapper from '../decorators/cnrWrapper.js';
import HttpError from '../helpers/HttpError.js';
import {sendEmail} from '../helpers/index.js';

const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;

    const url = gravatar.url(email, { s: '250', r: 'pg', d: '404'});
    const user = await User.findOne({ email });
    console.log(user)
    if (user) {
        throw HttpError(409, 'This email already used')
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, avatarURL: url, password: hashPassword, verificationToken });
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/auth/users/verify/${verificationToken}" target="_blank">Click to verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email
    })
}

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw HttpError(404, "User not found");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({ message: "Verification successful" });
};

const resentVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = User.findOne({ email });
    if (!user) {
        throw HttpError(404, "user not found")
    }
    if (user.verify) {
        throw HttpError(400, "email already verify")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/auth/users/verify/${user.verificationToken}" target="_blank">Click to verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.json({
        message: "email resend"
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "email or password is wrong")
    }

    if (!user.verify) {
        throw HttpError(400, 'Not verify user')
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "email or password is wrong")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token: "" });
    res.json({
        token
    })
};

const getCurrent = (req, res) => {
    const { name, email } = req.user;
    res.json({
        name,
        email,
    })
};

const signout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
        message: "Signout success"
    })
};

const avatarPath = path.resolve("public", "avatars");

const updateUserAvatar = async (req, res) => {
    const { path: oldPath, filename } = req.file;
    const outputPath = path.resolve("temp", filename);
    try {
       const image = await Jimp.read(outputPath);
       await image.resize(250, 250);
       await image.writeAsync(outputPath);
       req.file.path = outputPath;
    } catch {
       throw HttpError(400, `Bad request`);
    }
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const url = path.join("avatars", filename);

    const { _id } = req.user;
    const updateAvatar = await User.findByIdAndUpdate(_id, { avatarURL: url},{new: true});
        if (!updateAvatar) {
          throw HttpError(404, `User not found`);
        }
        res.json(
          updateAvatar
        );
};

export default {
    signup: cnrWrapper(signup),
    signin: cnrWrapper(signin), 
    getCurrent: cnrWrapper(getCurrent),
    signout: cnrWrapper(signout),
    updateUserAvatar: cnrWrapper(updateUserAvatar),
    verify: cnrWrapper(verify),
    resentVerifyEmail: cnrWrapper(resentVerifyEmail),
}