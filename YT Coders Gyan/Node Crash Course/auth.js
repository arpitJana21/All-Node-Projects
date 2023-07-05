const register = function (username) {
    console.log(`User ${username} has been registered.`);
};

const login = function (username) {
    console.log(`User ${username} has been logged in.`);
};

module.exports = {register, login};
