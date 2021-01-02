var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//
var testRouter = require('./routes/test');

var CreateSensorRouter = require('./routes/CreateSensor');

var CreateDescriptorRouter = require('./routes/CreateDescriptor');

var CreateContentRouter = require('./routes/CreateContent');

var DeleteSensorRouter = require('./routes/DeleteSensor');

var GetSensorRouter = require('./routes/GetSensor');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//static
app.use(express.static(path.join(__dirname, 'public')));

//dynamic
app.use('/', indexRouter);
app.use('/users', usersRouter);
//
app.use('/test', testRouter);

app.use('/CreateSensor', CreateSensorRouter);

app.use('/CreateDescriptor', CreateDescriptorRouter);

app.use('/CreateContent', CreateContentRouter);

app.use('/DeleteSensor', DeleteSensorRouter);

app.use('/GetSensor', GetSensorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
