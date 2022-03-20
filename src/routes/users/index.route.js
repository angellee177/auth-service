const express = require('express')
    , routes = express.Router()
    , { roles } = require('../../config/constant')
    , Controllers = require('../../controllers/userController')
    , AuthMiddleware = require('../../middleware/auth');

routes.get(
    '/', 
    [
        AuthMiddleware.authenticate([roles['ADM']['code'], roles['GA']['code']])
    ],
    Controllers.users,
)

routes.get(
    '/:userId',
    [
        AuthMiddleware.authenticate([
            roles['ADM']['code'],
            roles['GA']['code'],
            roles['CS']['code'],
            roles['OPS']['code'],
            roles['OWN']['code'],
            roles['SM']['code'],
            roles['SPM']['code'],
            roles['SPV']['code'],
            roles['USR']['code'],
        ]),
    ],
    Controllers.user,
)

routes.put(
    '/update/my-profile',
    [
        AuthMiddleware.authenticate([
            roles['ADM']['code'],
            roles['GA']['code'],
            roles['CS']['code'],
            roles['OPS']['code'],
            roles['OWN']['code'],
            roles['SM']['code'],
            roles['SPM']['code'],
            roles['SPV']['code'],
            roles['USR']['code'],
        ]),
    ],
    Controllers.update,
)

module.exports = routes;