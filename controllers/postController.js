const Post = require('../models/post')
const asyncHandler = require("express-async-handler");

//return a JSON object of all posts
exports.posts_getAll = asyncHandler(async (req, res, next) => {
  //retrieve all posts from the db
  const allPosts = await Post.find().sort({datewritten: 1}).exec();

  console.log(JSON.stringify(allPosts));

  //return them as a JSON object
  res.json(allPosts)
});

//return a JSON object of one post
exports.posts_getOne = asyncHandler(async (req, res, next) => {
  //retrieve the one post from the db corresponding to the id
  console.log(`in the middleware the id is `,req.params.id)
  let post = await Post.findById(req.params.id).exec();
  console.log(`this bet he post: `,post)
  res.json(post);
})

//create a new post from a JSON object passport.authenticate('jwt', {session: false}, 
exports.posts_post = async (req, res, next) => {
  // Check if req.user is null
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  if (req.user.admin === true){
    //Create a new post object
    const newPost = new Post({
      title: req.body.title,
      public: req.body.public,
      content: req.body.content,
      hidden: req.body.hidden,
      datepublished: req.body.datepublished,
      datewritten: Date.now()
    })
  
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  } else {
    console.log("User is not an admin!")
    res.status(403).json({error: 'Forbodden: You are not authorized to create posts'})
  }
};

//modify an existing post
exports.posts_modify = asyncHandler(async (req, res, next) => {
  const postID = req.params.id;
  const update = req.body;
  const updatedPost = await Post.findByIdAndUpdate(postID, update, {new: true});

  if (!updatedPost) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  res.status(201).json(updatedPost);
});

//delete a post
exports.posts_delete = asyncHandler(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id)

  if(!deletedPost){
    return res.status(404).json({success: false, message: 'Post not found'})
  }

  res.status(200).json(deletedPost);
})


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
//   -d '{"title":"Test Post again", "public":true, "content":"This is another test post"}' \
//   http://localhost:3000/api/posts
