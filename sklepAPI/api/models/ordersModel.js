
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StateSchema = require('./stateModel.js').model('States').schema;
var ProductSchema = require('./productModel.js').model('Products').schema;

var _previousState;

var OrderSchema = new Schema({
  commitDate: {
    type: Date
  },
  state: {
    type:StateSchema,
    required:true,
  },
  userName: {
    type: String,
    required:true,
    validate: {
      validator: function(v) {
        return v!="";
      },
      message: props => `User name is empty!`
    }
  },
  userEmail: {
    type: String,
    required:true,
    validate: {
      validator: function(v) {
        return v!="";
      },
      message: props => `Email is empty!`
    }
  },
  userPhone: {
    type: String,
    required:true,
    validate: {
      validator: function(v) {
        return v!="";
      },
      message: props => `Phone is empty!`
    }
  },
  products: [{
    product: {
      type:ProductSchema,
      required:true
    },
    amount: {
      type:Number,
      validate: {
        validator: function(v) {
          return v>0;
        },
        message: props => `Amount is not correct!`
        }
      }

    }
  ],
  date: {
    type:String
  }
  }
  );  
  
  module.exports = mongoose.model('Orders', OrderSchema);