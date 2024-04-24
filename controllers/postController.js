const Post = require('../models/post')
const asyncHandler = require("express-async-handler");

//return a JSON object of all posts
exports.posts_getAll = asyncHandler(async (req, res, next) => {
  //retrieve all posts from the db
  const allPosts = await Post.find().sort({_id: 1}).exec();

  console.log(JSON.stringify(allPosts));

  //return them as a JSON object
  res.json(allPosts)
});

//return a JSON object of one post
exports.posts_getOne = asyncHandler(async (req, res, next) => {
  //retrieve the one post from the db corresponding to the id
  req.json(await Post.findById(req.params.id));
})

//create a new post from a JSON object
exports.posts_post = asyncHandler(async (req, res, next) => {
  //TODO an authentication step for the user. Use JWTs? jsonwebtokens?

  console.log(req.body);

  const newPost = new Post({
    title: req.body.title,
    public: req.body.public,
    content: req.body.content,
    hidden: req.body.hidden,
    datepublished: req.body.datepublished,
    datewritten: req.body.datewritten
  })

  try {
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


// const PostSchema = new Schema({
//   title: {type: String, required},
//   public: {type: Boolean, required, default: true},
//   content: {type: String, required},
//   hidden: {type: Boolean, required, default: false},
//   datepublished: {type: Date, default: Date.now()},
//   datewritten: {type: Date, default: Date.now()}
// })

// curl -X POST \
//   -H "Content-Type: application/json" \
//   -d '{"title":"Test Post", "public":true, "content":"This is a test post"}' \
//   http://localhost:3000/api/posts
