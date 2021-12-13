const User = require('../../models/users/index')
    , { setLog } = require('../../../helper/utils');

const seedAdmin = async() => {
    try {
        const password   = 'White1704';

        const admins = [{
              username: "admin",
              email: "admin@xpense.com",
              password,
              role: 0
            }];

        let i = 0;
        while(i < 1){
            const isExistingAdmin = await User.findOne({
                username: admins[i]['username']
            });

            if(!isExistingAdmin){
                const admin = new User(admins[i]);
            
                await admin.save();
                
                setLog({
                    level: 'Seeders', method: 'Seeding Admin', message: "success"
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
