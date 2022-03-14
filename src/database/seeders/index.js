const RoleSeeders = require('./roles/index')
    , UserSeeders = require('./users/index')
    , AdminSeeders = require('./admin/index')
    , { setLog } = require('../../helper/utils');

const seedingData = async() => {
    try {
        await AdminSeeders();
        await UserSeeders();
        await RoleSeeders();
    
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
