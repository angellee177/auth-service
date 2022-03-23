const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , { CAR_STATUS } = require('../../../config/constant');

const carSchema = new Schema({
    nomorKendaraan: {
        type: String,
        required: true,
        unique: true,
    },
    merk: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    tahun: {
        type: BigInt,
        required: true,
    },
    picture: { 
        type: [String],
        required: true,
    },
    location: {
        type: String,
        default: null,
        comment: "Lokasi atau tempat mobil ini",
    },
    serviceFee: {
        type: String,
        default: null,
    },
    price: {
        type: BigInt,
        default: null,
    },
    status: {
        type: String,
        enum: Object.keys(CAR_STATUS),
    },
    rejectedReason: {
        type: String,
        default: null,
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
    },
}); 

const Cars = mongoose.model("Cars", carSchema);

module.exports = Cars;
