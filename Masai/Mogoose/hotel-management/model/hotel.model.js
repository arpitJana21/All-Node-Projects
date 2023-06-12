const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    hotel_name: {type: String},
    location: {type: String},
    rating: {type: String},
    serve_food: {type: String},
    userID: {type: String}
},{
    versionKey: false
});

const HotelModel = mongoose.model('hotels', hotelSchema);
module.exports = {HotelModel};