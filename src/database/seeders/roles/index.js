const Roles = require('../../models/roles/index')
    , User = require('../../models/users/index')
    , { get } = require('lodash')
    , { setLog } = require('../../../helper/utils')
    , { roles: ROLE } = require('../../../config/constant');

const seedRoles = async() => {
    try {

        const admin = await User.findOne({ roles: ROLE['ADM']['code'] });

        const userId = get(admin, 'id', null);

        const listOfRole = [
            ROLE['ADM'],
            ROLE['CS'],
            ROLE['GA'],
            ROLE['OPS'],
            ROLE['OWN'],
            ROLE['SM'],
            ROLE['SPM'],
            ROLE['SPV'],
            ROLE['USR'],
        ];

        let i = 0;
        while(i < listOfRole.length) {
            const isExistingRoles = await Roles.findOne({
                code: listOfRole[i]['code']
            });

            if(!isExistingRoles) {
                const role = new Roles({
                    code: listOfRole[i]['code'],
                    name: listOfRole[i]['code'],
                    created_by: userId,
                });

                await role.save();

                setLog({
                    level: "Seeders", method: `Seeding Roles ${listOfRole[i]['code']}`, message: "success"
                });
            };

            i++;
        }

    } catch(e) {
        setLog({
            level: "Seeders", method: "Seeding Roles failed", message: e.message
        });

        throw e;
    }
}

module.exports = seedRoles;
