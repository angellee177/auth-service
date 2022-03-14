const { StatusCodes } = require('http-status-codes')
    , { successResponse, errorResponse } = require('../helper/response')
    , { setLog } = require('../helper/utils')
    , Service = require('../services/users/index')
    , { roles: ROLE } = require('../config/constant');  

/**
 * Login 
 * 
 */
const login = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const authToken = await Service.generateAuthToken(email, password);

        setLog({
            level: 'Auth Controller', method: 'Login', message: "success"
        });

        return res.status(StatusCodes.OK).json(successResponse("success", authToken));

    } catch(e) {
        setLog({
            level: 'Auth Controller', method: 'Login failed', message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    }
};


/**
 * 
 * Create new User Account
 * 
 */
const register = async(req, res) => {
    const { email, username } = req.body;
    
    try {
        const result = await Service.register(req.body);

        setLog({
            level: 'Auth Controller', method: 'Register new User', message: email, others: username
        });

        return res.status(StatusCodes.OK).json(successResponse("success", result));

    } catch(e) {
        setLog({
            level: 'Auth Controller', method: 'Register new User failed', message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    }
};

module.exports = {
    login,
    register,
};
