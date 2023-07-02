const express = require('express');
const cors = require('cors');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const CLIENT_ID = '8611f88e0188869d0ab2';
const CLIENT_SECRET = '1e9e301c36975a1de5fc5c50d411018f9664fc19';
const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors());

// Get AccessToken
app.get('/getAccessToken', async function (req, res) {
    const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
    await fetch(`https://github.com/login/oauth/access_token${params}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => res.json(data));
});

// Get UserInfo
// Access token is going to be pased in as an Authorization header
app.get('/getUserInfo', async function (req, res) {
    console.log(req.get('Authorization'));
    let resp = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            Authorization: req.get('Authorization'), // Bearer ACCESSTOKEN
        },
    });
    let data = await resp.json();
    return res.json(data);
});

app.listen(PORT, function () {
    console.log(`Running Server : http://127.0.0.1:${PORT}/`);
});
