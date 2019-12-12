'use strict';
module.exports = function(app) {
  var orders = require('../controllers/orderController');

  // todoList Routes
  app.route('/orders')
    .get(orders.list_all_orders)
    .post(orders.create_order)
  app.route('/orders/:orderId')
    .get(orders.read_an_order)
    .put(orders.update_an_order)

};
