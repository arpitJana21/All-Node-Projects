const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: ture},
        city: {type: String, required: ture},
        age: {type: Number, required: false},
    },
    {
        versionKey: false,
    }
);

const userModel = mongoose.model('users', userSchema);

const main = async function () {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mongoDBI');
        console.log('Connected to the database');

        // Insert Many Documents
        await userModel.insertMany([
            {name: 'Arpit', city: 'Ghatal', age: 25},
            {name: 'Sourav', city: 'Dhankal', age: 24},
            {name: 'Prosen', city: 'ChandraCona', age: 26},
        ]);

        // Insert One Document
        const newUser = new userModel({
            name: 'Subrata',
            city: 'Chinsurah',
            age: 25,
        });
        await newUser.save();

        // Find All Documents
        const Allusers = await userModel.find();
        console.log(Allusers);

        // Find Document by filter
        const users = await userModel.findOne({city: 'Ghatal'});
        console.log(users);

        console.log('Users inserted into the database');
        mongoose.disconnect();
        console.log('Disconnected from the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

main();
