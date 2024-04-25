const Comment = require('../models/comment')
const asyncHandler = require("express-async-handler");

//returns a JSON object of all comments
exports.comments_getAll = asyncHandler(async (req, res, next) => {
  //retrieve all posts from the db
  const allComments = await Comment.find().sort({timestamp: 1})
  console.log(JSON.stringify(allComments));

  //return them as a JSON object
  res.json(allComments);
})

//returns a JSON object of one comment
exports.comments_getOne = asyncHandler(async(req, res, next) => {
  res.json(await Comment.findByID(req.params.id));
})

//creates a comment
exports.comment_post = asyncHandler(async(req, res, next) => {

  console.log(req.body)
  
  const newComment = new Comment({
    hidden: false,
    username: req.body.username,
    content: req.body.content,
    timestamp: Date.now()
  })

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
});

//updates a comment

//deletes a comment

// hidden: {type: Boolean, required, default: false},
// username: {type: String, required, default: "anonymous"},
// content: {type: String, required},
// timestamp: {type: Date, default: Date.now()}