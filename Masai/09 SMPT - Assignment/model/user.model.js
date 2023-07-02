const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        pass: {
            type: String,
            required: true
        },

        otp: {
            type: String,
            required: true,
        },

        verified: {
            type: Boolean,
            default: false,
        }
    },
    {
        versionKey: false,
    }
);

const UserModel = mongoose.model('user', userSchema);
module.exports = {UserModel};
