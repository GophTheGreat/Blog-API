"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments_delete = exports.comments_modify = exports.comments_post = exports.comments_getOne = exports.comments_getAll = void 0;
const blogComment = require('../models/comment');
const asyncHandler = require("express-async-handler");
//returns a JSON object of all comments
exports.comments_getAll = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //retrieve all posts from the db
    const allComments = yield blogComment.find().sort({ timestamp: 1 });
    console.log(JSON.stringify(allComments));
    //return them as a JSON object
    res.json(allComments);
}));
//returns a JSON object of one comment
exports.comments_getOne = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield blogComment.findByID(req.params.id));
}));
//creates a comment
exports.comments_post = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Request URL is: `, req.originalUrl);
    console.log(`Comment payload is: `, req.body);
    console.log(`Params are: `, req.params);
    console.log(`Post id is: `, req.params.postId);
    const newComment = new blogComment({
        hidden: false,
        post: req.params.postId,
        author: req.user,
        content: req.body.content,
        timestamp: Date.now()
    });
    try {
        const savedComment = yield newComment.save();
        res.status(201).json(savedComment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//updates a comment
exports.comments_modify = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentID = req.params.id;
    const update = req.body;
    const updatedComment = yield blogComment.findByIdAndUpdate(commentID, update, { new: true });
    if (!updatedComment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
}));
//deletes a comment
exports.comments_delete = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedComment = yield blogComment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
        res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.status(200).json(deletedComment);
}));
// hidden: {type: Boolean, required, default: false},
// username: {type: String, required, default: "anonymous"},
// content: {type: String, required},
// timestamp: {type: Date, default: Date.now()}
