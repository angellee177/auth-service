const User =  require('../database/models/users/index');

/**
 * 
 * Create new User
 * 
 * @param {String} username 
 * @param {String} email 
 * @param {String} password 
 */
 const register = async(username, email, password) => {
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
        password,
    });

    await user.save();

    return user;
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

module.exports = { register, users };
