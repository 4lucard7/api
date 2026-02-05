const ErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({message : err.message});
    next();
}

const notFound = (req, res, next) => {
    const error = new Error(`not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

module.exports = {ErrorHandler, notFound};