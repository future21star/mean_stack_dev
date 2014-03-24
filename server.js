'use strict';
/**
 *  Mean container for dependency injection
 */
var dependable = require('dependable');
var mean = exports.mean = dependable.container();
var EventEmitter = require('events').EventEmitter;
mean.events = new EventEmitter();

/**
 * Module dependencies.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    logger = require('mean-logger');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables
var config = require('./config/config');
var db = mongoose.connect(config.db);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./config/system/bootstrap')(mean, passport, db);

// TODO: add comment about what is this
mean.resolve({}, function(modules) {

});

// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;
