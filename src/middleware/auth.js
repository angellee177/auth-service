
const jwt = require('jsonwebtoken')
    , Role = require('../database/models/roles')
    , { set, get } = require('lodash')
    , dotenv = require('dotenv')
    , { StatusCodes } = require('http-status-codes')
    , { roles: availableRoles } = require('../config/constant')
    , { errorResponse } = require('../helper/response')
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
 * Authenticate User
 * @param {Array[String]} roles
 * 
 */
const authenticate = (roles) => async(req, res, next) => {

    const token = req.headers["authorization"].split("Bearer ")[1];

    try {
        if(!req.headers['authorization']) {
            return unauthenticated(req, res, next);
        };
    
        const user      = await decodingToken(token);
        
        const role      = get(user, 'role', null);      
        const email     = get(user, 'email', null);

        let rolesCode = [];
        
        for(let i = 0; i < role.length; i++) {
            const roleCode = await Role.find({ _id: role });
            rolesCode.push(roleCode[0]['code']);
        }
      
        
        const authorizeRole = roles.filter((val) => rolesCode.includes(val));

        if(authorizeRole.length === 0) {  
            const errorMessage = "Auth Middleware, authenticate: you don't have permission to access this API!";  
            throwErrorsHttp(errorMessage);
        }
        
        
        
        set(req.headers, 'User.email', email);
        set(req.headers, 'User.role', role);
                
        next();
    } catch(e) {
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
 * @param { String } email
 * @param { String } role
 * 
 */
const encodingToken = async(email, role) => {
    const secretKey = defaultToIfEmpty(process.env.JWT_SECRET_KEY, 'fake-secret-key');

    const token = await jwt.sign({ email, role }, secretKey);

    setLog({
        level: 'Auth Middleware', method: 'Encoding success', message: email, others: role
    });

    return token;
};


module.exports = {
    decodingToken,
    authenticate,
    encodingToken
}
