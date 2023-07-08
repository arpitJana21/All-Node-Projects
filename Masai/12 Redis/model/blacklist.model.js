const mongoose = require('mongoose')

const blackListSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        trim: true
    }
},{
    versionKey: false
})

const blacklistModel = mongoose.model('blacklist', blackListSchema);
module.exports = {blacklistModel};