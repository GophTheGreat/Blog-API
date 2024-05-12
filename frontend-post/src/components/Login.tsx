import { ReactNode, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login():ReactNode {
  const navigate = useNavigate();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username")
    const password = formData.get("password")
    const body = JSON.stringify({
      username: username, 
      password: password,
    })
    const response = await fetch(`https://blog-api-goph.fly.dev/api/users/login`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    if(response.ok){
      const data = await response.json();
      localStorage.setItem("token", data.token)
      navigate('/');
    } else {
      console.log(response)
    }
  }

  return(
    <div className="login">
      <Link to='/register'>Register</Link>
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;