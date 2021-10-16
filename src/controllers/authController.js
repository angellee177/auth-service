const User = require('../database/models/users/index')
    , { StatusCodes } = require('http-status-codes')
    , { successResponse, errorResponse } = require('../helper/response')
    , { get } = require('lodash')
    , { setLog, throwErrorsHttp } = require('../helper/utils')
    , Auth = require('../middleware/auth')
    , Service = require('../services/users/index')
    , bcrypt = require('bcrypt');  

/**
 * Login 
 * 
 */
const login = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const userInfo = await User.findOne({ email });

        const validPassword = await bcrypt.compare(password, userInfo.password);
        if(!userInfo || !validPassword) {
            const errorMessage = "Oops, We can't find your info in our database";
            setLog({
                level: 'Auth Controller', method: 'Login failed', message: errorMessage
            });

            throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
        };

        setLog({
            level: 'Auth Controller', method: 'Login', message: "success"
        });

        return res.status(StatusCodes.OK).json(successResponse("success", userInfo));

    } catch(e) {
        setLog({
            level: 'Auth Controller', method: 'Login failed', message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    }
};

/**
 * Generate Auth Token
 * 
 */
 const generateAuthToken = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const userInfo = await User.findOne({ email });
        const validPassword = await bcrypt.compare(password, userInfo.password);
      
        if(!userInfo || !validPassword) {
            const errorMessage = "Oops, We can't find your info in our database";
            setLog({
                level: 'Auth Controller', method: 'Login failed', message: errorMessage
            });

            throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
        };

        // get user info
        const role = get(userInfo, 'role');
        const username = get(userInfo, 'username');

        const token = await Auth.encodingToken(username, role);

        setLog({
            level: 'Auth Controller', method: 'Generate Auth Token Success', message: email, others: token
        });

        return res.status(StatusCodes.OK).json(successResponse("success", token));

    } catch(e) {
        setLog({
            level: 'Auth Controller', method: 'Generate Auth Token failed', message: e.message
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
    const { username, email, password } = req.body;

    try {
        const result = await Service.register(username, email, password);

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

/**
 * 
 * Create new User Account
 * 
 */
 const users = async(req, res) => {

    try {
        const result = await Service.users();

        setLog({
            level: 'Auth Controller', method: 'Get Users', message: "Success"
        });

        return res.status(StatusCodes.OK).json(successResponse("success", result));

    } catch(e) {
        setLog({
            level: 'Auth Controller', method: 'Get Users failed', message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    }
};

module.exports = {
    login,
    generateAuthToken,
    register,
    users
};
