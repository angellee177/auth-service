const mongoose = require('mongoose')
    , Schema = mongoose.Schema;
    
const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
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
        default: null,
    }
})

const Roles = mongoose.model("Roles", roleSchema);

module.exports = Roles;
