'use strict';


var mongoose = require('mongoose'),
  State = mongoose.model('States');

exports.list_all_states = function(req, res) {
    State.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_state = function(req, res) {
    var new_state = new State(req.body);
    new_state.save(function(err, state) {
      if (err)
        res.send(err);
      res.json(state);
    });
  };