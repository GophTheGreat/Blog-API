import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Feed():ReactNode {

  const [posts, setPosts] = useState([]);

  //Grab all posts
  useEffect(() => {
    async function retrievePosts() {
      const response = await fetch(`https://blog-api-goph.fly.dev/api/posts`, {
        method: `GET`
      })
      const posts = await response.json();
      console.log(posts);
      setPosts(posts);
    }
    retrievePosts();
  }, []);

  //Have button that brings you to a full page of the post


  return (
    <>
      {posts.map((post: any) => (
        <div className="post" key={post._id}> 
          <hr/>
          <b>{post.title}</b>
          <textarea name="" id="" cols={30} rows={10} disabled>{post.content}</textarea>
          <Link to={`/posts/${post._id}`}>See Post and Comments</Link>
          <hr/>
        </div>
      ))} 
    </>
  )
}

export default Feed;