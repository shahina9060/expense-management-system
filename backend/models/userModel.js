const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    userName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    confirmPassword:{
        type: String,
        require: true
    }
})

const UserAuth = mongoose.model('UserAuth', userData);

module.exports = UserAuth;