const express = require('express');
const {connection} = require('./db.js');
const {userRouter} = require('./routes/user.routes.js');

const app = express();

// Middleware
app.use(express.json());
app.use('/users', userRouter);

app.listen(4500, async function () {
    try {
        await connection;
        console.log('Connected to the DB');
        console.log('Server Running on port : 4500');
    } catch (err) {
        console.log('X-X-X Something Went Wrong');
        console.error(`Error: ${err.message}`);
    }
});
