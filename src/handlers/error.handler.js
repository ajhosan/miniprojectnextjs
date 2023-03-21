const ErrorHendler = (er, req, res, next) => {
    const { status, message, error } = err;
    const errObj = {
        status: status || 500,
        message: message,
        error: err
    }

    return res.status(errObj.status).json({
        ...errObj,
        error: true,
        message: errObj?.message,
        data: err
    })
}


export default ErrorHendler