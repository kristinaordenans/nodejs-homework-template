const messageList = {
    401: 'Unauthorized',
    404: 'Not found',
}

const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

export default HttpError;