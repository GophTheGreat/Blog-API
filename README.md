A backend and two frontends

https://blog-api-goph.fly.dev 

https://frontend-comment-goph.fly.dev

https://frontend-post-goph.fly.dev 

API:

POSTS

////GET all posts
https://blog-api-goph.fly.dev/api/posts/

////POST post
https://blog-api-goph.fly.dev/api/posts/

////GET single post
https://blog-api-goph.fly.dev/api/posts/:postId

////PUT post
https://blog-api-goph.fly.dev/api/posts/:postId

////DELETE post
https://blog-api-goph.fly.dev/api/posts/:postId

----------

COMMENTS

////GET all comments
https://blog-api-goph.fly.dev/api/posts/:postId/comments

////POST comment
https://blog-api-goph.fly.dev/api/posts/:postId/comments

////GET single comment
https://blog-api-goph.fly.dev/api/posts/:postId/comments/:commentId

////PUT comment
https://blog-api-goph.fly.dev/api/posts/:postId/comments/:postId/comments/:commentId

////DELETE comment
https://blog-api-goph.fly.dev/api/posts/:postId/comments/:postId/comments/:commentId

----------

USERS

///POST create a user
https://blog-api-goph.fly.dev/api/users

///POST log in
https://blog-api-goph.fly.dev/api/users/login

----------
