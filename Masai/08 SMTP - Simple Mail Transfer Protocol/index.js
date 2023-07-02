const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'triston.champlin11@ethereal.email',
        pass: 'DBpARzfSxUbp7akN2U',
    },
});

transporter
    .sendMail({
        to: 'triston.champlin11@ethereal.email',
        from: 'aj19990321@gmail.com',
        subject: 'First Email',
        text: 'This is a test email for nodemailer',
        html: "<a href='https://nodemailer.com/about/'>Click me</a>",
    })
    .then(() => {
        console.log('Mail Sent !');
    })
    .catch((err) => {
        console.log(err);
    });
