const blogComment = require('../models/comment')
const asyncHandler = require("express-async-handler");
import { Request as ExpressRequest, Response, NextFunction } from 'express'; // Assuming you're using Express

// Define the type for the asynchronous request handler
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

interface RequestWithUser extends ExpressRequest{
  user?: any;
}

//returns a JSON object of all comments
export const comments_getAll: AsyncRequestHandler = asyncHandler(async(req: RequestWithUser, res: Response, next: NextFunction) => {
  //retrieve all posts from the db
  const allComments = await blogComment.find().sort({timestamp: 1}).populate('author', 'username').exec();
  console.log(JSON.stringify(allComments));

  //return them as a JSON object
  res.json(allComments);
})

//returns a JSON object of one comment
export const comments_getOne: AsyncRequestHandler = asyncHandler(async(req: RequestWithUser, res: Response, next: NextFunction) => {
  console.log('searching for comment of id: ',req.params.commentId)
  let comment = await blogComment.findById(req.params.commentId).populate('author', 'username').exec();
  if (!comment){
    res.status(500)
  }
  res.status(200).json(comment);
})

//creates a comment
export const comments_post: AsyncRequestHandler = asyncHandler(async(req: RequestWithUser, res: Response, next: NextFunction) => {

  console.log(`Request URL is: `, req.originalUrl);
  console.log(`Comment payload is: `,req.body)
  console.log(`Params are: `,req.params)
  console.log(`Post id is: `,req.params.postId)
  
  const newComment = new blogComment({
    hidden: false,
    post: req.params.postId,
    author: req.user._id,
    content: req.body.content,
    timestamp: Date.now()
  })

  console.log(newComment)

  try {
    const savedComment = await newComment.save();
    console.log("comment was saved!", savedComment)
    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
});

//updates a comment
export const comments_modify: AsyncRequestHandler = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
  console.log("Attempting to modify comment: ",req.params.commentId)
  console.log(req.user)
  if(req.user === await blogComment.findById(req.params.commentId).author || req.user.admin === true){
    console.log("user is verified")
    const commentID = req.params.commentId;
    const update = req.body;
    const updatedComment = await blogComment.findByIdAndUpdate(commentID, update, {new: true});

    if (!updatedComment) {
      return res.status(404).json({success: false, message: 'Comment not found'})
    }
    console.log(updatedComment);

    res.status(200).json(updatedComment)
  } else {
    res.status(403).json({error: 'Forbidden: You are not authorized to modify this comment'});
  }
})

//deletes a comment
export const comments_delete: AsyncRequestHandler= asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
  console.log("Attempting to delete comment: ",req.params.commentId);
  if(req.user === await blogComment.findById(req.params.commentId).author || req.user.admin === true){
    console.log("user is verified")
    const deletedComment = await blogComment.findByIdAndDelete(req.params.commentId);

    if(!deletedComment){
      res.status(404).json({success: false, message: 'Comment not found'})
    }
    res.status(200).json(deletedComment);
  } else {
    res.status(403).json({error: 'Forbodden: You are not authorized to delete this comment'});
  }
})

// hidden: {type: Boolean, required, default: false},
// username: {type: String, required, default: "anonymous"},
// content: {type: String, required},
// timestamp: {type: Date, default: Date.now()}