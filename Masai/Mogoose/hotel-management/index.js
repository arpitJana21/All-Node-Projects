const express = require('express');
const {connection} = require('./db.js');
const {ownerRouter} = require('./routes/owner.routes.js');
const {hotelRouter} = require('./routes/hotel.routes.js');
const {limiter} = require('./middleware/limiter.middleware.js')
require('dotenv').config();


  

const app = express();
app.use(express.json());
app.use('/api', limiter);
app.use('/owners', ownerRouter);
app.use('/hotels', hotelRouter);

// Taking PORT number from Console
const port = +process.env.PORT;

// CLI command to run the server : 'PORT={portNumber} npm run server
app.listen(port, async function(){
    console.log('Connecting to the server....')
    await connection;
    console.log('Server is Ready for use :)');
    console.log(`localhost:${port}`)
})


