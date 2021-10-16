
const jwt = require('jsonwebtoken')
    , { set, get } = require('lodash')
    , dotenv = require('dotenv')
    , { StatusCodes } = require('http-status-codes')
    , { successResponse, errorResponse } = require('../helper/response')
    , { throwErrorsHttp, setLog, defaultToIfEmpty } = require('../helper/utils');

dotenv.config();

/**
 * 
 * Decoding Token
 * @param {String} token
 * 
 */
const decodingToken = (token) => {
    if (token) {
        try {
            const secretKey = defaultToIfEmpty(process.env.JWT_SECRET_KEY, 'fake-secret-key');

            const decoded = jwt.verify(token, secretKey);

            setLog({
                level: 'Auth Middleware', method: 'Decoding success', message: decoded['role']
            });

            return decoded;
        } catch (err) {
            setLog({
                level: 'Auth Middleware', method: 'Decoding Failed', message: err.message
            });

            throw err;
        }
    } else {
        const errorMessage = "No token provided";

        setLog({
            level: 'Auth Middleware', method: 'Decoding Failed', message: errorMessage
        });

        throwErrorsHttp(errorMessage);
    }
}

/**
 * available user role
 */
const availableRoles = {
    admin: 0,
    user: 1
}

/**
 * Authenticate User
 * @param {String} roles
 * 
 */
const authenticate = (roles) => async(req, res, next) => {
    const token = req.headers["authorization"].split("Bearer ")[1];

    try {
        if(!req.headers['authorization']) {
            return unauthenticated(req, res, next);
        };
    
        const user = await decodingToken(token);
        const role = get(user, 'role');      
        const username = get(user, 'username');        
        
        if(role !== availableRoles[roles]) {  
            const errorMessage = "Auth Middleware, authenticate: you don't have permission to access this API!";  
            throwErrorsHttp(errorMessage);
        }
        
        
        
        set(req.headers, 'User.username', username);
        set(req.headers, 'User.role', role);
                
        next();
    } catch(e) {
        console.log(res.status(200));
        return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse(e.message));
    }
    
};

/**
 * Hanlde unauthenticated Users
 * 
 */
const unauthenticated = (req, res, next) => res.status(StatusCodes.UNAUTHORIZED).json(errorResponse("Unauthorized"));

/**
 * Generate Auth Token
 * 
 * @param {String} username
 * @param {String} role
 * 
 */
const encodingToken = async(username, role) => {
    const secretKey = defaultToIfEmpty(process.env.JWT_SECRET_KEY, 'fake-secret-key');

    const token = await jwt.sign({ username, role }, secretKey);

    setLog({
        level: 'Auth Middleware', method: 'Encoding success', message: username, others: role
    });

    return token;
};


module.exports = {
    decodingToken,
    authenticate,
    encodingToken
}
