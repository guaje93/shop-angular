'use strict';
module.exports = function(app) {
  var states = require('../controllers/stateController');

  // todoList Routes
  app.route('/states')
    .get(states.list_all_states)    
    .post(states.create_state)

};
