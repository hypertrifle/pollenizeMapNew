//Data Model for user
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model('user', UserSchema);