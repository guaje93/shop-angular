'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
    name: {
    type: String,
    enum:['Alkohol','Inne']
}

});

module.exports = mongoose.model('Categories', CategorySchema);