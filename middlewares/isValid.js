import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError.js";

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        return next(HttpError(404, 'not valid id'))
    }
    next();
}

export default isValidId;