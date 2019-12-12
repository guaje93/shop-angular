
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StateSchema = new Schema({
    name: {
    type: String,
    enum: ['uncommitted', 'committed', 'cancelled', 'done']
  }
});

module.exports = mongoose.model('States', StateSchema);