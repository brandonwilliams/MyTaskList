const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

const mongodbUri = config.database;
// var db = mongojs(mongodbUri, ['users']);

const TaskSchema = mongoose.Schema({
  isDone: {
    type: Boolean,
  },
  title: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  }
});

const Task = module.exports = mongoose.model('Tasks', TaskSchema);

module.exports.getTaskById = function(id, callback){
  Task.findById(id, callback);
}

module.exports.getTaskByTitle= function(username, callback){
  const query = {title: title}
  Task.findOne(query, callback);
}

module.exports.addTask = function(newTask, callback){
      var _task = new Task(newTask);
      _task.save(callback);

}

module.exports.updateTask = function(newTask, callback){
      var _task = new Task(newTask);
      _task.update(callback);

}
