const Roles = require("../database/models/roles/index")
    , { StatusCodes } = require('http-status-codes')
    , { successResponse, errorResponse } = require('../helper/response')
    , { setLog, throwErrorsHttp } = require('../helper/utils')
    , Service = require('../services/roles/index')

/**
 * 
 * Create new Roles
 * 
 */
const createNewRoles = async(req, res) => {
    const { email } = req.headers;
    const { code, name } = req.body;

    try {
        const role = await Service.newRole(code, name, email);

        setLog({
            level: "Roles Controller", method: "Create New Roles", message: "Success"
        });

        return res.status(StatusCodes.OK).json(successResponse("success", role));
    } catch(e) {
        setLog({
            level: "Roles Controller", method: "Create New Roles failed", message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    };
};

/**
 * 
 * Updating existing role
 * 
 */
const updatingRole = async(req, res) => {
    const { roleId } = req.params;
    const { name } = req.body;

    try {
        const result = await Service.updateRole(roleId, name);

        setLog({
            level: "Roles Controller", method: "Updating Role", message: "Success", others: roleId
        });

        return res.status(StatusCodes.OK).json(successResponse("success", result));
    } catch(e) {
        setLog({
            level: "Roles Controller", method: "Updating Role failed", message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    }
};

/**
 * 
 * Get role detail by roleId
 *  
 */
const role = async(req, res) => {
    const { roleId } = req.params;

    try {
        const result = await Service.getRole(roleId);

        setLog({
            level: "Roles Controller", method: "Get Role by ID", message: "Success", others: roleId
        });

        return res.status(StatusCodes.OK).json(successResponse("success", result));
    } catch(e) {
        setLog({
            level: "Roles Controller", method: "Get Role by ID failed", message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    }
};

/**
 * 
 * Get roles
 * 
 */
const roles = async(req, res) => {
    try {
        const result = await Service.roles();

        setLog({
            level: "Roles Controller", method: "Get Roles", message: "Success",
        });

        return res.status(StatusCodes.OK).json(successResponse("success", result));
    } catch(e) {
        setLog({
            level: "Roles Controller", method: "Get Roles failed", message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    }
};

/**
 * 
 * delete role by id
 * 
 */
const deleteRole = async(req, res) => {
    const { roleId } = req.params;

    try {
        const result = await Service.deleteRole(roleId);

        setLog({
            level: "Roles Controller", method: "Delete Role by Id", message: "success", others: true
        });

        return res.status(StatusCodes.OK).json(successResponse("success", result));
    } catch(e) {
        setLog({
            level: "Roles Controller", method: "Delete Role by Id failed", message: e.message
        });

        return res.status(StatusCodes.EXPECTATION_FAILED).json(errorResponse(e.message));
    };
};

module.exports = { 
    createNewRoles, 
    updatingRole, 
    role, 
    roles, 
    deleteRole, 
};
