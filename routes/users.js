!(function(){
	'use strict';

	var express = require('express'),
	router = express.Router();

	var route = function(app){
		
     app.use('/api/users',router);
	}
	module.exports = route;
})();