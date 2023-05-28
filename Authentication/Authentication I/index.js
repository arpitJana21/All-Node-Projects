const express = require('express');
const {connection} = require('./db.js');
const {userRouter} = require('./routes/user.routes.js');
const {contentRouter} = require('./routes/content.routes.js');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/content', contentRouter);

app.listen(8080, async function () {
    try {
        console.log('Running at http://localhost:8080/');
        console.log('Connecting to the DB....');
        await connection;
        console.log('Connected to the DB');
    } catch (error) {
        console.log(`Something Went Wrong !!\nError: ${error.message}`);
    }
});
