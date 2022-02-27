const express = require('express')
    , routes = express.Router()
    , { roles } = require('../../config/constant')
    , AuthControllers = require('../../controllers/authController')
    , AuthMiddleware = require('../../middleware/auth');

routes.get(
    '/', 
    [
        AuthMiddleware.authenticate([roles.ADM, roles.GA])
    ],
    AuthControllers.users
)

module.exports = routes;