const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    owner_name: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: false},
    password: {type: String, required: true, unique: false},
    phone: {type: String, required: true, unique: true},
    age: {type: Number, required: false, unique: false},
    city: {type: String, required: false, unique: false},
},{
    versionKey: false
});

const OwnerModel = mongoose.model('owners', ownerSchema);
module.exports = {OwnerModel};