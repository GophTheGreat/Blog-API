import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";

function Post(props: RouteComponentProps):ReactNode {
  const { postId } = props.match.params;

  const [post, setPost] = useState('');
  const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   async function retrieveComments() {
  //     const response = await fetch(`https://blog-api-goph.fly.dev/api/posts/${postId}`, {
  //       method: `GET`
  //     })
  //     const post = await response.json();
  //     console.log(post);
  //     setPost(post);
  //   }
  //   retrieveComments();
  // }, []);

  //Grab all comments if the post has any
  if(post.comments.length > 0)
  useEffect(() => {
    async function retrieveComments() {
      const response = await fetch(`https://blog-api-goph.fly.dev/api/posts/${postId}/comments`, {
        method: `GET`
      })
      const comments = await response.json();
      console.log(comments);
      setComments(comments);
    }
    retrieveComments();
  }, []);


  return (
    <>
      {comments.map((comment: any) => (
        <div className="post" key={post._id}> 
          <hr/>
          <b>{post.title}</b>
          {post.content}
          <Link to={`/posts/${post._id}`}></Link>
          <hr/>
        </div>
      ))} 
    </>
  )
}

export default Post;