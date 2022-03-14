const Roles = require('../../database/models/roles/index')
    , { throwErrorsHttp, setLog } = require('../../helper/utils')
    , { StatusCodes } = require('http-status-codes')


/**
 * 
 * Create new Role
 * 
 * @param {String} code 
 * @param {String} name 
 */
const newRole = async(code, name) => {
    const isExistRole = await Roles.findOne({
        $or: [
            { name },
            { code }
        ]
    });

    if(isExistRole) {
        const errorMessage = "Oops, name of role or code of role already exist in database. Please use another one.";
        setLog({
            level: "Roles Services", method: "Create new Role failed", message: erroMessage
        });

        throwErrorsHttp(errorMessage, StatusCodes.BAD_REQUEST);
    };

    const role = new Roles({
        name,
        code,
    });

    await role.save();

    return role;
};

/**
 * Update existing role
 * 
 * @param {String} code
 * 
 */
const updateRole = async(roleId, name) => {
    const isExistingRole = await Roles.findById({ roleId });

    if(!isExistingRole) {
        const errorMessage = "Oops, cannot find the role in our database.";
        setLog({
            level: "Roles Services", method: "Updating Role failed", message: erroMessage
        });

        throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
    }

    await isExistingRole.updateOne({ name });

    return true;
};

/**
 * Get specific role by id.
 * 
 * @param {String} roleId
 * 
 */
const getRole = async( roleId ) => {
    const role = await Roles.findOne({
        $and: [
            { _id: roleId },
            { deleted_at: null }
        ],
    });

    if(!role) {
        const errorMessage = "Oops, Role doesn't exist. Please try another one.";
        setLog({
            level: "Roles Services", method: "Get Role failed", message: erroMessage
        });

        throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
    };

    return role;
};

/**
 * 
 * Get all Roles from table.
 * 
 */
const roles = async() => {
    const allRole = await Roles.find();

    return {
        roles: allRole,
        total: allRole.length
    };
};

/**
 * 
 * Delete role by Id.
 * 
 * @param {String} roleId 
 * 
 */
const deleteRole = async(roleId) => {
    const isExistingRole = await Roles.findById({ roleId });

    if(!isExistingRole) {
        const errorMessage = "Oops, cannot find the role in our database.";
        setLog({
            level: "Roles Services", method: "Updating Role failed", message: erroMessage
        });

        throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
    };

    await Roles.findByIdAndUpdate({ _id: roleId, deleted_at: Date.now });

    return true;
};

module.exports = { newRole, updateRole, getRole, roles, deleteRole }