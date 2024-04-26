const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const jwt = require('jsonwebtoken');

exports.users_login = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if(err || !user) {
        const error = new Error('An error occurred');
        return next(error);
      }

      req.login(user, {session: false}, async (error) => {
        if(error) return next(error);
        
        const body = {_id: user._id}
        const token = jwt.sign({user: body}, process.env.TOKEN)
        return res.json({token});
      })
    } catch (err){
      return next(err);
    }
  })(req, res, next);
});

//GET for logging out
exports.users_logout = asyncHandler((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
});