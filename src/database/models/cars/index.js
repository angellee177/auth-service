const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const carSchema = new Schema({
    nomor_kendaraan: {
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
    picture: {
        type: [String],
        required: true,
    },
    location: {
        type: String,
        default: null,
        comment: "Lokasi atau tempat mobil ini",
    },
    service_fee: {
        type: String,
        default: null,
    },
    price: {
        type: String,
        default: null,
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
        default: Date.now,
    },
}); 

const Cars = mongoose.model("Cars", carSchema);

module.exports = Cars;
