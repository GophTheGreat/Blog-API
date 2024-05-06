const blogComment = require('../models/comment');
const commentController = require('../controllers/commentController');
const User = require('../models/user');
const request = require('supertest');
const app = require('../app');

describe('CommentController', () => {
  let adminToken: any;
  let postId: string;
  let comment2Id: string;
  beforeAll(async() => {
    let admin = await User.findOne({username: "testAdmin"}).exec()
    //If there's no admin account, create one and log in
    if(!admin) {
      console.log('No admin account. Creating')
      admin = {        
        username: "testAdmin",
        password: "aAsSdDfF1!",
        confirmPassword: "aAsSdDfF1!",
        admin: true
      };
      await request(app)
        .post('/api/users/')
        .send(admin)
        .expect(201);
    };
    const token: any = await request(app)
      .post('/api/users/login')
      .send({
        username: "testAdmin",
        password: "aAsSdDfF1!",
      })
      .expect(200)
    adminToken = token.body.token;
    
    const post = await request(app)
      .post('/api/posts/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Comment post', 
        content: 'Content', 
        datewritten: Date.now(), 
        datepublished: Date.now()
      })
    postId = post.body._id;
    console.log(`Comment test post's ID is: `, postId);
    
    expect(post.body).toEqual(expect.objectContaining({
      title: 'Comment post',
      content: 'Content'
    }));
  })
  describe('comments_post', () => {
    it('should create 2 new comments', async() => {
      console.log("postId:", postId);
      let response = await request(app)
        .post(`/api/posts/${postId}/comments/`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          content: 'this is test comment content' 
        })
        .expect(201)

      expect(response.body).toEqual(expect.objectContaining({
        content: 'this is test comment content'
      }))

      response = await request(app)
        .post(`/api/posts/${postId}/comments/`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          content: 'this is another test comment content' 
        })
        .expect(201)

      expect(response.body).toEqual(expect.objectContaining({
        content: 'this is another test comment content' 
      }))
    })
  })
  describe('comments_getAll', () => {
    it('should list all comments', async() => {
      let response = await request(app)
        .get(`/api/posts/${postId}/comments/`)

      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          content: 'this is another test comment content' 
        }),
        expect.objectContaining({
          content: 'this is test comment content' 
        })
      ]))
    })
  })
  describe('comments_', () => {
    
  })
  describe('comments_', () => {
    
  })
  describe('comments_', () => {
    
  })
})