const User = require('../../models/users/index')
    , { setLog } = require('../../../helper/utils')
    , { roles:  ROLE } = require('../../../config/constant');

const seedUsers = async() => {
    try {
        const password   = 'White1704';

        const users = [
            {
              username: "angellee177",
              email: "angelriapurnamasari17@gmail.com",
              password,
              roles: JSON.stringify([ ROLE['USR']['code'] ]),
            }
          ];

        let i = 0;
        while(i < users.length){
            
            const isExistingUser = await User.findOne({
                email: users[i]['email']
            });

            if(!isExistingUser){
                const userData = new User(users[i]);
            
                await userData.save();
                
                setLog({
                    level: 'Seeders', method: `Seeding Users ${users[i]['username']}`, message: "success"
                });
            };
            i++;
        }  

    } catch (e) {
        setLog({
            level: 'Seeders', method: 'Seeding Users failed', message: e.message
        });

        throw e;
    }
};

module.exports = seedUsers;
