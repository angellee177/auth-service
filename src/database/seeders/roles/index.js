const Roles = require('../../models/roles/index')
    , { setLog } = require('../../../helper/utils')
    , { roles: ROLE } = require('../../../config/constant');

const seedRoles = async() => {
    try {
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
                const role = new Roles(listOfRole[i]);

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
