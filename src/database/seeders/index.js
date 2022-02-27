const RolesSeeder = require('./roles/index')
    , UsersSeeder = require('./users/index')
    , AdminsSeeder = require('./admin/index')
    , { setLog } = require('../../helper/utils');

const seedingData = async() => {
    try {
        await RolesSeeder();
        await AdminsSeeder();
        await UsersSeeder();
    
        setLog({
            level: 'Seeders', method: 'Seeding all Data', message: "success"
        });
    
        return true;
    } catch(e) {
        setLog({
            level: 'Seeders', method: 'Seeding all Data Failed', message: e.message
        });

        throw e;
    }
};

module.exports = { seedingData };
