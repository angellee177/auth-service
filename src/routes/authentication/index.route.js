const express = require('express')
    , routes = express.Router()
    , AuthControllers = require('../../controllers/authController')

routes.post('/login', AuthControllers.login);
routes.post('/generate-token', AuthControllers.generateAuthToken);
routes.post('/register', AuthControllers.register);

module.exports = routes;
