var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var productsRouter = require('./routes/products');

var app = express();
mongoose.connect("mongodb://meenal:meenal123@ds231090.mlab.com:31090/demo");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsRouter);

module.exports = app;
