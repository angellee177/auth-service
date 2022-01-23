const express       = require('express')
    , routes        = express.Router()
    , userRoutes   = require('./users/index.route')
    , authRoutes    = require('./authentication/index.route');

routes.use('/auth'  ,   authRoutes);
routes.use('/users' ,   userRoutes);

module.exports = routes;
