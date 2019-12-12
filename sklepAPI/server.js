var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Product = require('./api/models/productModel'), //created model loading here
  Category = require('./api/models/categoryModel'), //created model loading here
  State = require('./api/models/stateModel'), //created model loading here
  Order = require('./api/models/ordersModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Sklep'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// use it before all route definitions
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var productRoutes = require('./api/routes/productRoutes'); //importing route
var categoryRoutes = require('./api/routes/categoryRoutes'); //importing route
var statesRoutes = require('./api/routes/stateRoutes'); //importing route
var orderRoutes = require('./api/routes/orderRoutes'); //importing route
productRoutes(app); //register the route
categoryRoutes(app); //register the route
statesRoutes(app); //register the route
orderRoutes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);