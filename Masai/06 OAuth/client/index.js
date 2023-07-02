const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');
const getUserInfoBtn = document.querySelector('#getUserInfo');
const message = document.querySelector('#message');
const userInfo = document.querySelector('#userInfo');

const PROXY_SERVER = `http://127.0.0.1:4000`;
const CLIENT_ID = '8611f88e0188869d0ab2';

const loggedInUI = function(){
    loginBtn.classList.add('hide');
    logoutBtn.classList.remove('hide');
    getUserInfoBtn.classList.remove('hide');
    message.textContent = 'You are Logged-in';
}

const notLoggedInUI = function(){
    loginBtn.classList.remove('hide');
    logoutBtn.classList.add('hide');
    getUserInfoBtn.classList.add('hide');
    message.textContent = 'Login Using GitHub';
    userInfo.textContent = '';
}

document.addEventListener('DOMContentLoaded', async function () {
    if (localStorage.getItem('access_token') === null) {
        notLoggedInUI();
    } else {
        loggedInUI();
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    if (codeParam && localStorage.getItem('accessToken') === null) {
        console.log(`${PROXY_SERVER}/getAccessToken?code=${codeParam}`);
        let res = await fetch(
            `${PROXY_SERVER}/getAccessToken?code=${codeParam}`
        );
        let data = await res.json();
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            loggedInUI();
        }
    }
});

loginBtn.addEventListener('click', function () {
    window.location.assign(
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
});

logoutBtn.addEventListener('click', function(){
    localStorage.removeItem("access_token");
    notLoggedInUI();
})

getUserInfoBtn.addEventListener('click', async function(){
    const token = localStorage.getItem('access_token');
    console.log(token);
    const res = await fetch(`${PROXY_SERVER}/getUserInfo`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    })

    const data = await res.json();
    console.log(data)
    userInfo.textContent = JSON.stringify(data);
})
