//Created date 17-04-2017
var express = require('express'),
    app = express(),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    logger = require('morgan'),
	mongoose = require('mongoose'),
	config   = require('./config/Configuration'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compression = require('compression');

var logConfig = {
    skip: function(req, res) {
        return res.statusCode < 400
    }
};

app.use(logger('dev', logConfig));

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
}

app.set('rootDirectory', __dirname); // Set root directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.database.mongodb.url, function (err) {
    if (err) {
        console.log(err);
        process.exit(0);
    } else {
        console.log('Mongodb connected');
    }
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '2149');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// require routes files
var routPath = path.join(app.get('rootDirectory'), 'routes');
var files = fs.readdirSync(routPath);
files.forEach(function(file, index) {
    require(path.join(routPath, file))(app);
})

// catch 404 and forward to error handler
app.use('/api/*', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            success: false,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message,
        error: err
    });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

module.exports = app;
