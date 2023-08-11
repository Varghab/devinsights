const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    bio:{
        type: String,
    },
    avatar:{
        type: String
    }
})

const userModel = mongoose.model('users', userSchema);

module.exports = {userModel};