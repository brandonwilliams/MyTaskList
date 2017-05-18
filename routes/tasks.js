var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://<dbuser>:<dbpassword>@ds143221.mlab.com:43221/mytasklist', ['tasks']);
// ** Above enter your mongodb connection info. If you're using mLab, go into your database and copy the path to connect using the driver (where it says "To connect using a driver via the standard MongoDB URI") and replace the one above. Enter your collection name (ex: tasks) into the array.

// Get ALL Tasks
router.get('/tasks', function(req, res, next){
  db.tasks.find(function(err, tasks){
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

// Get Single Task
router.get('/task/:id', function(req, res, next){
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

// Save Task
router.post('/task', function(req, res, next){
  var task = req.body;
  if(!task.title || !(task.isDone + '')){
    res.status(400);
    res.json({
      "error":"Bad Data"
    });
  } else {
    db.tasks.save(task, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    })
  }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

// Update Task
router.put('/task/:id', function(req, res, next){
  var task = req.body;
  var updTask = {};

  if(task.isDone){
    updTask.isDone = task.isDone;
  }

  if(task.title){
    updTask.title = task.title;
  }

  if(!updTask){
    res.status(400);
    res.json({
      "error":"Bad Data"
    });
  }

  db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

module.exports = router;
