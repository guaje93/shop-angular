'use strict';


var mongoose = require('mongoose'),
  Category = mongoose.model('Categories');

exports.list_all_categories = function(req, res) {
    Category.find({}, function(err, cat) {
    if (err)
      res.send(err);
    res.json(cat);
  });
};

exports.create_category = function(req, res) {
    var new_cat = new Category(req.body);
    new_cat.save(function(err, cat) {
      if (err)
        res.send(err);
      res.json(cat);
    });
  };
