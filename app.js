const routes = require("./routes/index")

require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require("express-session");
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var app = express();

const mongodb = process.env.NODE_ENV === 'test' ? process.env.TESTDB : process.env.MONGO;
const mongoose = require("mongoose");
const db = mongoose.connection;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongodb);
  db.on("error", console.error.bind(console, "mongo connection error"));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRETKEY,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.session());

app.use('/api/users', routes.users);
app.use('/api/posts', routes.posts);
app.use('/api/comments', routes.comments);

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

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({username: username});
      const match = await bcrypt.compare(password, user.password);

      if(!user) {
        return done(null, false, {message: "Incorrect username"})
      }
      if(!match){
        return done(null, false, {message: "Incorrect Password"})
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

passport.use(
  new JWTStrategy(
  {
    secretOrKey: process.env.SECRETKEY,
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
  },
  async(token, done) => {
    try{
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  })
)

module.exports = app;
