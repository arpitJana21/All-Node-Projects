const express = require('express');
const {sequelize} = require('./db.js');
const {batchRouter} = require('./routes/batchRoute.js');
const {studentRouter} = require('./routes/studentRoute.js');

const port = 3002;

const app = express();
app.use(express.json());

app.use('/api/batches/', batchRouter);
app.use('/api/students/', studentRouter);

app.listen(port, async function () {
    try {
        console.log('Connecting to DB...');
        await sequelize.sync();
        console.log(`Server is Running on http://localhost:${port}`);
    } catch (error) {
        console.log('Something Wrong !!');
        console.log(error);
    }
});
