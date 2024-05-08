const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require('jsonwebtoken');

exports.users_create = [
  body("username")
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage("Need a username")
    .isAscii()
    .withMessage("Name must be in ASCII characters"),
  body("password")
    .trim()
    .isLength({min: 1})
    .matches(/^(?=.*\d)/)
    .withMessage("Password must contain at least one number")
    .matches(/^(?=.*[a-z])/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/^(?=.*[^\w\s])/)
    .withMessage("Password must contain at least one special character (!@#$%^&*()_+{}|:<>?)"),
  body("confirmPassword")
    .trim()
    .custom((value, {req}) => {return value === req.body.password;})
    .withMessage("Passwords must match"),

  asyncHandler(async (req, res, next) => {
    //Extract the validation errors from the request
    const errors = validationResult(req);

    //Password will be hashed pre-save
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      admin: req.body.admin
    })

    console.log(newUser);

    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    try {
      //Data from the request is valid
      const savedUser = await newUser.save();
      res.status(201).json(savedUser)
    } catch (error){
      //Handle database errors
      return next(error);
    }
  })
];

exports.users_login = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    const expiresIn = 3600; //Expires in 1 hour
    try {
      if(err || !user) {
        const error = new Error('An error occurred');
        return next(error);
      }
      const token = jwt.sign({user}, process.env.SECRETKEY, {expiresIn})
      return res.status(200).json({ token });
    } catch (err){
      return next(err);
    }
  })(req, res, next);
});
