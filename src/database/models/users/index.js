const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , bcrypt = require('bcrypt')
    , saltRounds = 10
    , dotenv = require('dotenv')
    , jwt = require('jsonwebtoken')
    , { defaultToIfEmpty } = require('../../../helper/utils')

const userSchema = new Schema({
    username: {
        type: String,
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
    role: {
        type: Number,
        enum: [0, 1],
        default: 1
    },
    full_name: {
        type: String,
    },
    contact_number: {
        type: String,
    },
    address: {
        type: String,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
    prizesDeliveries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deliveries" }],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    deleted_at: {
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
