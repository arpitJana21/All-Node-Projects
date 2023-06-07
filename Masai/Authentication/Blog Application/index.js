const express = require('express');
const {connection} = require('./db.js');
const {userRouter} = require('./Routes/user.routes.js');
const {blogRouter} = require('./Routes/blog.routes.js');

const app = express();
app.use(express.json());
app.use('/users',userRouter);
app.use('/blogs', blogRouter);

app.listen(8080, async function () {
    try {
        console.log('Server is in Process...');
        await connection;
        console.log(':) Server is Ready to Use');
        console.log('Running at -> localhost:8080');
    } catch (error) {
        console.log(`Something Went Wrong !!\nError: ${error.message}`);
    }
});
