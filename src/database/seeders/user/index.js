const User = require('../../models/users/index')
    , { setLog } = require('../../../helper/utils');

const seedUsers = async() => {
    try {
        const password   = 'White1704';

        const users = [
            {
              username: "anugrahaman71",
              email: "anugrahaman71@gmail.com",
              password
            },
            {
              username: "rahelpratama413",
              email: "rahelpratama413@gmail.com",
              password
            },
            {
              username: "aisyahrodiah354",
              email: "aisyahrodiah354@gmail.com",
              password
            },
            {
                username: "donomargonobegono97",
                email: "donomargonobegono97@gmail.com",
                password
            }
          ];

        let i = 0;
        while(i < 4){
            const isExistingUser = await User.findOne({
                username: users[i]['username']
            });

            if(!isExistingUser){
                const userData = new User(users[i]);
            
                await userData.save();
                
                setLog({
                    level: 'Seeders', method: 'Seeding Users', message: "success"
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
