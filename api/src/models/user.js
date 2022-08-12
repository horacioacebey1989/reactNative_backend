var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  idUser: String,
  userName : String,
  email: String,
  password: String,
});

module.exports = mongoose.model('user', UserSchema);