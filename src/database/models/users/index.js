const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , bcrypt = require('bcrypt')
    , saltRounds = 10
    , { roles:  ROLE, branch_code: BRANCH } = require('../../../config/constant')
    , jwt = require('jsonwebtoken')
    , { defaultToIfEmpty } = require('../../../helper/utils')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: function (email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        enum: [
            ROLE.ADM['code'], 
            ROLE.CS['code'],
            ROLE.GA['code'],
            ROLE.OPS['code'],
            ROLE.OWN['code'],
            ROLE.SM['code'],
            ROLE.SPM['code'],
            ROLE.SPV['code'],
            ROLE.USR['code'],
        ],
        required: true,
    },
    fullname: {
        type: String,
    },
    dob: {
        type: Date,
        default: null,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    nip: {
        type: String,
        default: null,
        comment: "Nomor Induk Pegawai",
    },
    branchCode: {
        type: String,
        default: BRANCH['MGL'],
        enum: Object.values(BRANCH),
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: Date.now,
    }
});


// encrypt the password before save user register data
userSchema.pre('save', function (next) {
    let user = this
    user.password = bcrypt.hashSync(user.password, saltRounds);
    next()
});


// generate token for user
const secretKey = defaultToIfEmpty(process.env.JWT_SECRET_KEY, '275E3B77F9E2FE1E3E5FEBADAA945');

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email}, secretKey);
    
    return token;
}

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
