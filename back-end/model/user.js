const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String, unique: true},
    mobile: {type: Number},
    password: {type: String},
});


const User = mongoose.model('UserDetails',UserSchema,'UserDetails');

module.exports = User;