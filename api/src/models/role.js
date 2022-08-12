var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
  idRole: String,
  name: String,
  state: Boolean
});

module.exports = mongoose.model('role', RoleSchema);