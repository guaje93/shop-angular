'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorySchema = require('./categoryModel.js').model('Categories').schema;

var ProductSchema = new Schema({
    name: {
    type: String,
    required:true,
    validate: {
      validator: function(v) {
        return v!="";
      },
      message: props => `name is not defined!`
      }
  },
  description: {
    type: String,
    validate: {
      validator: function(v) {
        return v!="";
      },
      message: props => `description is not defined!`
      }
  },
  price: {
    type: Number,
    validate: {
      validator: function(v) {
        return v>0;
      },
      message: props => `price cannot be less or equal 0!`
      }
   },
  weight: {
    type: Number,
    validate: {
      validator: function(v) {
        return v>0;
      },
      message: props => `weight cannot be less or equal 0!`
      }
   },
   category: {
     type:CategorySchema,
     
     required:true}
  });

module.exports  = mongoose.model('Products', ProductSchema);