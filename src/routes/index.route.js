const express       = require('express')
    , routes        = express.Router()
    , userRoutes   = require('./users/users.route')
    , authRoutes    = require('./authUser/authUsers.route');

routes.use('/auth'  ,   authRoutes);
routes.use('/users' ,   userRoutes);

module.exports = routes;
