const postController = require ('../controllers/postController')
const Post = require('../models/post')

// Mock database module
const createMockDatabase = () => {
  const mockDatabase = {
    posts: [
      { _id: 'post1', title: 'Post 1', content: 'Content 1', hidden: false, datepublished: new Date(), datewritten: new Date()},
      { _id: 'post2', title: 'Post 2', content: 'Content 2', hidden: false, datepublished: new Date(), datewritten: new Date()},
      // Add more posts as needed
    ],
    find: jest.fn().mockImplementation(() => {
      return { sort: () => ({ exec: () => Promise.resolve(mockDatabase.posts) }) };
    }),
    findById: jest.fn().mockImplementation((id) => {
      const post = mockDatabase.posts.find(post => post._id === id);
      return Promise.resolve(post);
    })
  }
  return mockDatabase;
};

jest.mock('../models/post', () => createMockDatabase());

describe('postController', () => {
  describe('posts_getAll', () => {
    it('should return all posts', async() => {
      const req = {};
      const res = {json: jest.fn()};

      await postController.posts_getAll(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ _id: 'post1', title: 'Post 1', content: 'Content 1' }),
        expect.objectContaining({ _id: 'post2', title: 'Post 2', content: 'Content 2' })
      ]));
    });
  });
  describe('posts_getOne', () => {
    it('should return post 2', async() => {
      const postId = 'post2';
      
      const req = {params: {id: postId}};
      const res = {json: jest.fn()};
      await postController.posts_getOne(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({_id: 'post2', title: 'Post 2', content: 'Content 2'}));
    })
  })
  describe('posts_post', () => {
    it('makes a new post', async() => {
      const post = new Post({
        _id: 'post3', 
        title: 'Created Post', 
        content: 'Created Content', 
        datewritten: new Date(), 
        datepublished: new Date()
      });

      const req = {body: post};
      const res = {json: jest.fn()};
      await postController.posts_post(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: 'post3', 
          title: 'Created Post', 
          content: 'Created Content'
        })
      );
    });
  });
});
