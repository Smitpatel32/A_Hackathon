const mongoose = require('mongoose')
const {Schema} = mongoose

// User Schema
const UserSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});

const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User