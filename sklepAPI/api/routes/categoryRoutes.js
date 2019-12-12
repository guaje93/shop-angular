'use strict';
module.exports = function(app) {
  var categories = require('../controllers/categoryController');

  // todoList Routes
  app.route('/categories')
    .get(categories.list_all_categories)
    .post(categories.create_category)
};
