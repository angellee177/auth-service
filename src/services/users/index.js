const User =  require('../../database/models/users/index')
    , { throwErrorsHttp, setLog } = require('../../helper/utils')
    , { StatusCodes } = require('http-status-codes')
    , Auth = require('../../middleware/auth')
    , { roles: ROLE, branch_code: BRANCH } = require('../../config/constant')
    , { get } = require('lodash')
    , bcrypt = require('bcrypt');

/**
 * 
 * Create new User
 * 
 * @param {Object} payload
 * @param {String} payload.username 
 * @param {String} payload.email 
 * @param {String} payload.password 
 * @param {String} payload.roles
 * @param {String} payload.fullname
 * @param {String} payload.phoneNumber
 * @param {String} payload.dob
 * @param {String} payload.address
 * @param {String} payload.nip employee identity number
 * @param {String} payload.branchCode
 */
 const register = async(payload) => {     
    const { 
        username, 
        email,
        password, 
        roles = [ ROLE['USR']['code'] ],
        fullname,
        phoneNumber = null,
        dob = null,
        address = null,
        nip = null, 
        branchCode = BRANCH.MGL,
    } = payload;
    
    const userInfo = await User.findOne({ email });
      
    if(userInfo) {
        const errorMessage = "Oops, You already have account with this email!";
        setLog({
            level: 'Users Services', method: 'Register Failed', message: errorMessage
        });

        throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
    };
    
    const user = new User({
        username,
        email,
        fullname,
        password,
        roles,
        phoneNumber,
        dob,
        address,
        nip,
        branchCode,
    });

    await user.save();

    return true;
};

/**
 * 
 * Get Users
 * 
 */
const users = async() => {
    const userList = await User.find({});

    return userList;
};

/**
 * Generate Auth Token
 * 
 */
 const generateAuthToken = async(email, password) => {

        const userInfo = await User.findOne({ email });

        if(!userInfo) {
            const errorMessage = "Oops, wrong email. please kindly check again.";
            setLog({
                level: 'User Services', method: 'Login failed', message: errorMessage, others: email
            });

            throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
        }
        
        const validPassword = await bcrypt.compare(password, userInfo['password']);

        if(!validPassword) {
            const errorMessage = "Oops, wrong password. please kindly check again.";
            setLog({
                level: 'User Services', method: 'Login failed', message: errorMessage, others: email
            });

            throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
        };

        // get user info
        const role = get(userInfo, 'roles');

        const token = await Auth.encodingToken(email, role);

        setLog({
            level: 'User Services', method: 'Generate Auth Token Success', message: email, others: token
        });

        return token;
};

/**
 * 
 * Update User Profile.
 * 
 * @param {Object} payload
 * @param {String} payload.username 
 * @param {String} payload.password 
 * @param {String} payload.roles
 * @param {String} payload.fullname
 * @param {String} payload.phoneNumber
 * @param {String} payload.dob
 * @param {String} payload.address
 * @param {String} payload.nip employee identity number
 * @param {String} payload.branchCode
 * @param {String} email 
 */
const update = async(payload, email) => {
    const userInfo = await User.findOne({ email });
      
    if(userInfo) {
        const errorMessage = "Oops, You already have account with this email!";
        setLog({
            level: 'Users Services', method: 'Register Failed', message: errorMessage
        });

        throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
    };

    const result = await User.update({ _id: userInfo._id }, payload);

    return result;
}

module.exports = { 
    register, 
    users, 
    generateAuthToken,
    update, 
};
