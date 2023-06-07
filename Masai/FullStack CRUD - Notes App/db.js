const mongoose = require('mongoose');
const connection = mongoose.connect(
    'mongodb+srv://arpitjana:arpitjana@cluster0.m1ox26z.mongodb.net/notesApp?retryWrites=true&w=majority'
);
module.exports = {connection};
