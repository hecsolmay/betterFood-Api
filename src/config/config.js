
require('dotenv').config();

module.exports = {
    mongoUri: process.env.MONGO_URI,
    SECRET: 'better-food.api-secret'
}