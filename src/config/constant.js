exports.NODE_ENVIRONMENT = {
    dev: 'development',
    test: 'testing',
    prod: 'production'
}

exports.roles = {
    GA: {
        code: "GA",
        name: "General Admin",
    },
    ADM: {
        code: "ADM",
        name: "Administrator",
    },
    OWN: {
        code: "OWN",
        name: "Owner"
    },
    OPS: { 
        code: "OPS",
        name: "Operational Team"
    },
    SPM: {
        code: "SPM",
        name: "Sales or Purchasing Manager"
    },
    SPV: {
        code: "SPV",
        name: "Supervisor"
    },
    SM: {
        code: "SM",
        name: "Sales & Marketing"
    },
    CS: {
        code: "CS",
        name: "Customer Service"
    },
    USR: {
        code: "USR",
        name: "User or Customer"
    },
}

exports.branch_code = {
    MGL: "Mega Legenda",
    BAJ: "Batu Aji",
    TJP: "Tanjungpinang"
}

exports.CAR_STATUS = {
    pending: "waiting for approvals",
    approved: "approved",
    rejected: "rejected",
};