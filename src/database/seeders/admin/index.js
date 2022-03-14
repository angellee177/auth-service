const User = require('../../models/users/index')
    , Roles = require('../../models/roles/index')
    , { setLog, throwErrorsHttp } = require('../../../helper/utils')
    , admins = require('./adminList');

const seedAdmin = async() => {
    try {
        let i = 0;
        while(i < admins.length){
            const isExistingAdmin = await User.findOne({
                email: admins[i]['email']
            });

            if(!isExistingAdmin){
                const admin = new User(admins[i]);

                await admin.save();
                
                setLog({
                    level: 'Seeders', method: `Seeding Admin ${admins[i]['username']}`, message: "success"
                });
            };
            i++;
        }  

    } catch (e) {
        setLog({
            level: 'Seeders', method: 'Seeding Admin failed', message: e.message
        });

        throw e;
    }
};

module.exports = seedAdmin;
