var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  idTask: String,
  title: String,
  description: String,
});

module.exports = mongoose.model('task', TaskSchema);