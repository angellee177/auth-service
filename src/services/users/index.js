const User =  require('../../database/models/users/index')
    , Roles = require('../../database/models/roles/index')
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
        roles,
        fullname,
        phoneNumber = null,
        dob = null,
        address = null,
        nip = null, 
        branchCode = BRANCH.MGL,
    } = payload;
    
    const userInfo = await User.find({ email });
      
    if(userInfo.length !== 0) {
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
        phoneNumber,
        dob,
        address,
        nip,
        branchCode,
    });


    const isValidRole = await Roles.find({
        $and: [
            { _id: { $eq: roles[i] } },
            { deletedAt: { $eq: null } }
        ]
    });

    if(isValidRole.length === 0) return throwErrorsHttp("Oops, Roles not found");

    user['roles'] = isValidRole[0]


    await user.save();

    return true;
};

/**
 * 
 * Get User Detail
 */
const user = async(userId) => {    
    const userInfo = await User.find({ _id: userId });

    if(userInfo.length === 0) {
        const errorMessage = "Oops, User Not found";
        setLog({
            level: 'Users Services', method: 'Get User Detail Failed', message: errorMessage
        });

        throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
    };

    return userInfo[0];
};

/**
 * 
 * Get current user who are loggin.
 * 
 */
 const currentUser = async(email) => {    
    const userInfo = await User.find({ email: email });

    if(userInfo.length === 0) {
        const errorMessage = "Oops, User Not found";
        setLog({
            level: 'Users Services', method: 'Get User Detail Failed', message: errorMessage
        });

        throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
    };

    return userInfo[0];
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

        const userInfo = await User.find({ email });

        if(userInfo.length === 0) {
            const errorMessage = "Oops, wrong email. please kindly check again.";
            setLog({
                level: 'User Services', method: 'Generate Auth Token failed', message: errorMessage, others: email
            });

            throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
        }
        
        const validPassword = await bcrypt.compare(password, userInfo[0]['password']);

        if(!validPassword) {
            const errorMessage = "Oops, wrong password. please kindly check again.";
            setLog({
                level: 'User Services', method: 'Generate Auth Token failed', message: errorMessage, others: email
            });

            throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
        };

        // get user info
        const role = get(userInfo[0], 'roles');

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
    const userInfo = await User.find({ email });
      
    if(userInfo.length === 0) {
        const errorMessage = "this account is not exists!";
        setLog({
            level: 'Users Services', method: 'Update Failed', message: errorMessage
        });

        throwErrorsHttp(errorMessage, StatusCodes.NOT_FOUND);
    };

    await userInfo[0].update(payload);


    return userInfo;
};

// const delete = async(userId) => {
//     const 
// }

module.exports = { 
    register, 
    users, 
    user,
    currentUser,
    generateAuthToken,
    update, 
};
