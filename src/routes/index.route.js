const express       = require('express')
    , routes        = express.Router()
    , userRoutes   = require('./users/index.route')
    , authRoutes    = require('./authentication/index.route')
    , rolesRoutes = require('./roles/index.route');

routes.use('/auth'  ,   authRoutes);
routes.use('/users' ,   userRoutes);
routes.use('/roles',    rolesRoutes);

module.exports = routes;
