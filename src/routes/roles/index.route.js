const express = require("express")
    , routes = express.Router()
    , { roles } = require('../../config/constant')
    , RolesControllers = require('../../controllers/rolesController')
    , AuthMiddleware = require('../../middleware/auth');

routes.post(
    "/new",
    [
        AuthMiddleware.authenticate([roles.GA['code'], roles.ADM['code'], roles.OWN['code']])
    ],
    RolesControllers.createNewRoles
);

routes.get(
    "/",
    [
        AuthMiddleware.authenticate([
            roles.GA['code'], 
            roles.ADM['code'], 
            roles.OWN['code']
        ])
    ],
    RolesControllers.roles,
);

routes.get(
    "/:roleId",
    [
        AuthMiddleware.authenticate([roles.GA['code'], roles.OWN['code']])
    ],
    RolesControllers.role,
);

routes.put(
    "/update/:roleId",
    [
        AuthMiddleware.authenticate([roles.GA['code'], roles.OWN['code']])
    ],
    RolesControllers.updatingRole,
);

routes.delete(
    "/delete/:roleId",
    [
        AuthMiddleware.authenticate([roles.GA['code'], roles.OWN['code']])
    ],
    RolesControllers.deleteRole,
);

module.exports = routes;