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
const blogComment = require('../models/comment');
const commentController = require('../controllers/commentController');
const User = require('../models/user');
const request = require('supertest');
const app = require('../app');
describe('CommentController', () => {
    let adminToken;
    let postId;
    let comment2Id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        let admin = yield User.findOne({ username: "testAdmin" }).exec();
        //If there's no admin account, create one and log in
        if (!admin) {
            console.log('No admin account. Creating');
            admin = {
                username: "testAdmin",
                password: "aAsSdDfF1!",
                confirmPassword: "aAsSdDfF1!",
                admin: true
            };
            yield request(app)
                .post('/api/users/')
                .send(admin)
                .expect(201);
        }
        ;
        const token = yield request(app)
            .post('/api/users/login')
            .send({
            username: "testAdmin",
            password: "aAsSdDfF1!",
        })
            .expect(200);
        adminToken = token.body.token;
        const post = yield request(app)
            .post('/api/posts/')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
            title: 'Comment post',
            content: 'Content',
            datewritten: Date.now(),
            datepublished: Date.now()
        });
        postId = post.body._id;
        console.log(`Comment test post's ID is: `, postId);
        expect(post.body).toEqual(expect.objectContaining({
            title: 'Comment post',
            content: 'Content'
        }));
    }));
    describe('comments_post', () => {
        it('should create a new comment', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("postId:", postId);
            let response = yield request(app)
                .post(`/api/posts/${postId}/comments/`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                content: 'this is test comment content'
            })
                .expect(201);
            expect(response.body).toEqual(expect.objectContaining({
                content: 'this is test comment content'
            }));
        }));
    });
    describe('comments_getAll', () => {
        // let response = await request(app)
        //   .get('/api/comments/:id')
    });
    describe('comments_', () => {
    });
    describe('comments_', () => {
    });
    describe('comments_', () => {
    });
});