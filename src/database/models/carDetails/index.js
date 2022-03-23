const mongoose = require('mongoose')
    , Schema = mongoose.Schema
    
const carDetailsSchema = new Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cars",
    },
    ac: {
        type: String,
        default: null,
    },
    kaca: {
        type: String,
        default: null,
    },
    klakson: {
        type: String,
        default: null,
    },
    bodyDepan: {
        type: String,
        default: null,
    },
    oli: {
        type: String,
        default: null,
    }, 
    kakiKaki: {
        type: String,
        default: null,
    },
    lampu: {
        type: String,
        default: null,
    },
    kunciMobil: {
        type: BigInt,
        default: null,
    },
    banSerap: {
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
    }
});

const CarDetails = mongoose.model("CarDetails", carDetailsSchema);

module.exports = CarDetails;
