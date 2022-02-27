const Roles = require("../../../database/models/roles")

/**
 * Check the Roles must be present in Roles DB
 * @param {String} value 
 * @param {Object} path 
 */
exports.isValidRole = async(value, { path }) => {
    const isValid = await Roles.findOne({
        $and: [
            { name: { $eq: value } },
            { deletedAt: { $eq: null } }
        ]
    });

    if(!isValid) {
        throw new Error(`The selected ${path} is invalid`);
    }

    return true;
};

/**
 * Find Role id by name
 */
exports.findRole = async( name ) => {
    const role = await Roles.findOne({ name });

    if(!role) {
        throw new Error(`The role doesn't exist!`);
    }

    return role._id;
};