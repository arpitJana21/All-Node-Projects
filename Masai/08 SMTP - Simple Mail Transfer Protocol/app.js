const nodemailer = require('nodemailer');

const {EMAIL, PASSWORD} = require('./env.js');

const userEmail = 'arpitjana2103@gmail.com';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
});

transporter
    .sendMail({
        to: userEmail,
        from: EMAIL,
        subject: 'First Email',
        text: 'This is a test email for nodemailer',
        html: "<a href='https://nodemailer.com/about/'>Click me</a>",
    })
    .then(function () {
        console.log(`You received an email at ${userEmail}`);
    })
    .catch((error) => {
        console.log(error);
    });
