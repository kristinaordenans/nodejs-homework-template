import jwt from 'jsonwebtoken';
import cnrWrapper from '../decorators/cnrWrapper.js';
import {HttpError} from '../helpers/index.js';
import User from '../models/user.js';
import "dotenv/config";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        throw HttpError(401);
    }
    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);

        // if (!user || !user.token)
        if (!user) {
            throw HttpError(401);
        }
        req.user = user;
        next();
    }
    catch {
        throw HttpError(401);
    }
}

export default cnrWrapper(authenticate);
