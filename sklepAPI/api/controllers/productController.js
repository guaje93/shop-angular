'use strict';


var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

exports.list_all_products = function(req, res) {
    Product.find({}, function(err, prod) {
    if (err){
      res.send(err);
    }
    res.json(prod);
  });
};

exports.create_product = function(req, res) {
  var new_product = new Product(req.body);
  new_product.save(function(err, prod) {
    if (err){
      res.status(400);
      res.send(err);
    }
    res.json(prod);
  });
};


exports.read_a_product = function(req, res) {
  Product.findById(req.params.productId, function(err, prod) {
    if (err){
      res.send(err);
    }
    res.json(prod);
  });
};


exports.update_a_product = function(req, res) {
    Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true, runValidators: true}, function(err, prod) {
    if (err)
    {
      res.status(400);
      res.send(err);
    }  
    res.json(prod);
  });
};
