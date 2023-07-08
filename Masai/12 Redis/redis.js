// Import Redis
const Redis = require("ioredis");
// Create Redis Server
const redis = new Redis();
// Exprot Redis
module.exports = {redis};