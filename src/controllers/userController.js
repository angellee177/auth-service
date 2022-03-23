const { StatusCodes } = require('http-status-codes')
    , { successResponse, errorResponse } = require('../helper/response')
    , { setLog } = require('../helper/utils')
    , Service = require('../services/users/index')

/**
 * 
 * Create new User Account
 * 
 */
 const newUser = async(req, res) => {
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

/**
 * 
 * Get all users
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

/**
 * 
 * Get user detail
 * 
 */
 const user = async(req, res) => {
    const { userId } = req.params;
    
    try {
        const result = await Service.user(userId);

        setLog({
            level: 'User Controller', method: 'Get User Detail', message: "Success"
        });

        return res.status(StatusCodes.OK).json(successResponse("success", result));

    } catch(e) {
        setLog({
            level: 'User Controller', method: 'Get User Detail failed', message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    }
};

/**
 * 
 * Get current user profile.
 * 
 */
 const myProfile = async(req, res) => {
    const { email } = req.headers;
    console.log("🚀 ~ file: userController.js ~ line 89 ~ myProfile ~  email",  email)
    
    try {
        const result = await Service.currentUser(email);

        setLog({
            level: 'User Controller', method: 'Get My Profile', message: "Success"
        });

        return res.status(StatusCodes.OK).json(successResponse("success", result));

    } catch(e) {
        setLog({
            level: 'User Controller', method: 'Get My Profile failed', message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    }
};

/**
 * 
 * Update User Profile.
 * 
 */
const update = async(req, res, next) => {
    const { email } = req.headers;

    try {
        const result = await Service.update(req.body, email);

        setLog({
            level: "User Controller", method: "Update User", message: "success", others: email,
        });

        return res.status(StatusCodes.OK).json(successResponse(result));
    } catch(e) {
        setLog({
            level: "User Controller", method: "Update User Failed", message: e.message, others: email
        });

        return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse(e.message));
    }
}

module.exports = {
    newUser,
    users,
    update,
    user,
    myProfile,
};
