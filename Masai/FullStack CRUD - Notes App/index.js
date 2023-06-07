const express = require('express');
const {connection} = require('./db.js');
const {userRouter} = require('./routes/user.routes.js');
const {noteRouter} = require('./routes/note.routes.js');

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/notes', noteRouter);

app.listen(4500, async function () {
    try {
        console.log('Please Wait. Server is in process...');
        await connection;
        console.log(':) Server is ready to use.');
        console.log('Running on -> localhost:4500/');
    } catch (err) {
        console.log('Something Wrong !!');
        console.log(`Error: ${err.message}`);
    }
});
