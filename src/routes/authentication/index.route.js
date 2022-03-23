const express = require('express')
    , routes = express.Router()
    , AuthControllers = require('../../controllers/authController')

routes.post('/login', AuthControllers.login);

module.exports = routes;
