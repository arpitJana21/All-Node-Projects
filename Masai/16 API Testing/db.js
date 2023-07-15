const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://127.0.0.1:27017/mocha_test");
const userSchema = mongoose.Schema({
    id: Number,
    name: String,
    userName: String,
    email: String
})

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel, connection };