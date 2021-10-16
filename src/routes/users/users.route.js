const express = require('express')
    , routes = express.Router()
    , AuthControllers = require('../../controllers/authController')
    , AuthMiddleware = require('../../middleware/auth');

routes.get(
    '/', 
    [
        AuthMiddleware.authenticate("admin")
    ],
    AuthControllers.users
)

module.exports = routes;