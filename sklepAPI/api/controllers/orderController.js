'use strict';


var mongoose = require('mongoose'),
  Order = mongoose.model('Orders');

exports.list_all_orders = function (req, res) {
  Order.find({}, function (err, ord) {
    if (err)
      res.send(err);
    res.json(ord);
  });
};
exports.create_order = function (req, res) {
  var new_ord = new Order(req.body);
  new_ord.save(function (err, ord) {
    if (err) {
      res.status(400);
      res.send(err);
    }
    res.json(ord);
  });
};

exports.read_an_order = function (req, res) {
  Order.findById(req.params.orderId, function (err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};

exports.update_an_order = function (req, res) {
  Order.findById(req.params.orderId, function (err, order) {
    if (order.state.name == "cancelled"){
      res.status(400);
      res.send({ error: "Cancelled order cannot be changed" });
  }else if (order.state.name == "committed" && req.body.state.name =="uncommitted")
   {
     res.status(400);
     res.send({ error: "Order was already committed" });


   } 
    
    else 
    {
      Order.findOneAndUpdate({ _id: req.params.orderId }, { state: req.body.state, date: req.body.date }, { new: true }, function (err, prod) {
        if (err)
          res.send(err);
        res.json(prod);
      });
    }
  })
};