'use strict';
module.exports = function(app) {
  var products = require('../controllers/productController');
  // var categories = require('../controllers/categoryController');

  // todoList Routes
  app.route('/products')
    .get(products.list_all_products)
    .post(products.create_product)
  app.route('/products/:productId')
    .get(products.read_a_product)
    .put(products.update_a_product)
};
