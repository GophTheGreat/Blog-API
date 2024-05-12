import { ReactNode, FormEvent} from "react";


function WritePost(): ReactNode {

  async function submitPost(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const content = formData.get('content');
    const hidden = formData.get('hidden') === 'on';
    const token = localStorage.getItem('token');
    const body = JSON.stringify({
      title: title,
      content: content,
      hidden: hidden
    });

    const response = await fetch(`https://blog-api-goph.fly.dev/api/posts`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: body
    });
    console.log(response);
    if(response.ok){
      alert('Post successful!');
      window.location.reload();
    } else {
      //Handle the error response
      console.log(response.json());
      const errorData = await response.json();
      const errorMessage = errorData.errors.join(', ')
      alert(errorMessage);
    }
  }

  return(
    <div className="postContainer">
      <form onSubmit={submitPost}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="content">Content</label>
        <textarea name="content" rows={20} cols={50}></textarea>
        <label htmlFor="hidden">Hidden</label>
        <input type="checkbox" name="hidden" id="hidden" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default WritePost;