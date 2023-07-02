const mongoose = require('mongoose');

const blackListSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
}, 
{
    versionKey: false
});

const blackListModel = mongoose.model('blackList', blackListSchema);
module.exports = {blackListModel};