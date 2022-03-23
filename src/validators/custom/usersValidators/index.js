const User = require('../../../database/models/users');

/**
 * Check if User exist DB
 * @param {String} value 
 * @param {Object} path 
 */
exports.isValidEmail = async(value, { path }) => {
    const isValid = await User.findOne({
        $and: [
            { email: { $eq: value } },
            { deletedAt: { $eq: null } }
        ]
    });

    if(!isValid) {
        throw new Error(`The selected ${path} is invalid`);
    }

    return true;
};