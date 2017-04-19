!(function() {
    'use strict';
    
    var Configuration = {
    	siteUrl: 'http://localhost:2149',
		database: {
            mysql: {
                host: '',
                user: '',
                password: '',
                db: ''
            },
            mongodb: {
                url: 'mongodb://localhost:27017/node_db'
            }
        }
     };
    module.exports = Configuration;
})();
