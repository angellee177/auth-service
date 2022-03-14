const { roles: ROLE } = require('../../../config/constant');

const roleObj = Object.values(ROLE);
const password   = 'White1704';

let j = 0;
let admins = [];
let name = "";
let values = {};

while(j < roleObj.length){
    name = String(roleObj[j]['name']).replace(/\s+/g, '').toLowerCase();

    values = {
        username: name,
        email: `${name}@ramscar.com`,
        password,
        roles: [roleObj[j]['code']]
    };

    admins.push(values)
    j++;
}

module.exports = admins;