import { ReactNode, useEffect, useState, FormEvent  } from "react";
import { useParams } from "react-router-dom";


function Post():ReactNode {
  const { postId } = useParams();
  const [post, setPost] = useState({title: '', content: ''});
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function submitComment(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get('content');
    const token = localStorage.getItem('token')
    const body = JSON.stringify({
      content: content
    })

    const response = await fetch(`https://blog-api-goph.fly.dev/api/posts/${postId}/comments`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: body
    });
    console.log(response);
    if(response.ok){
      alert('Comment Successful!');
      window.location.reload();
    } else {
      //Handle the error response
      console.log(response.json());
      const errorData = await response.json();
      const errorMessage = errorData.errors.join(', ')
      alert(errorMessage);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    async function retrievePost() {
      const response = await fetch(`https://blog-api-goph.fly.dev/api/posts/${postId}`, {
        method: `GET`
      })
      const post = await response.json();
      console.log(post);
      setPost(post);
    }
    retrievePost();
  }, [postId]);

  //Grab all comments if the post has any
  useEffect(() => {
    async function retrieveComments() {
      const response = await fetch(`https://blog-api-goph.fly.dev/api/posts/${postId}/comments`, {
        method: `GET`
      })
      const comments = await response.json();
      console.log(comments);
      console.log(comments[0].author);
      setComments(comments);
    }
    retrieveComments();
  }, [postId]);

  return (
    <div className="post">
      <b>{post.title}</b>
      {post.content}
      {isLoggedIn ? 
        <>
          <form onSubmit={submitComment}>
          <textarea name='content' rows={20} cols={50} defaultValue="Write comment..."></textarea>
          <button type="submit">Post Comment</button> 
          </form>
        </>
        : null
      }
      {comments.map((comment: any) => (
        <div className="comment" key={comment._id}> 
          <hr/>
          {comment.content}
          <p className="author">by {comment.author.username}</p>
          <hr/>
        </div>
      ))} 
    </div>
  )
}

export default Post;