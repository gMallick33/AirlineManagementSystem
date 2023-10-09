const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            data: {},
            message: 'something went wrong',
            err: 'email or password missing in the request'
        });
    }
    next();
}

module.exports = {
    validateUserAuth
}