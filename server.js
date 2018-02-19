if (!process.env.PORT) {
  require('dotenv').config()
}

const express = require('express');
const Sequelize = require('sequelize')
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const index = require('./routes/index');
const pets = require('./routes/cats');
const comments = require('./routes/comments');
const purchases = require('./routes/purchases');

const app = express();
//const http = require('http').Server(app);
//const io = require('socket.io')(http)

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})
client.connect()

sequelize = new Sequelize('cat-craigslist', 'root', process.env.SQLPASS, {
  dialect: 'postgres'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/cats', pets);
app.use('/cats/:catId/comments', comments);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.status == 404){
    res.redirect('/404.html')
  } else {
    res.redirect('/500.html')
  }
});

//io.on('connection', function(socket) {
//  console.log('connected')
//})

//http.listen(4000, function(){
//  console.log('listening on 4000');
//});

module.exports = app;
