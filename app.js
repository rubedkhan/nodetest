// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
 
 
  
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 7000;        // set our port

//Database connection
mongoose.connect('mongodb://localhost:27017/test', function(err, db) {
	if(!err){
      console.log("Mongodb connected");
	}
});

// ROUTES FOR OUR API
// =============================================================================
 require('routes/routes.js')(app);


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);