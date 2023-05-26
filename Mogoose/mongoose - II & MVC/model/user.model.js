const mongoose = require('mongoose');

// Schema :
const userSchema = mongoose.Schema(
    {
        name: String,
        age: Number,
        location: String,
        is_married: Boolean,
        followers: Number,
    },
    {
        versionKey: false,
    }
);

// Model
const UserModel = mongoose.model('users', userSchema);
module.exports = {UserModel};
