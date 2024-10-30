const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connection = async(MONGO_URL)=>{
    try {
        mongoose.connect(MONGO_URL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connection;