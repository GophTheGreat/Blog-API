import { ReactNode, useState } from "react";

function Login():ReactNode {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);

  async function handleLogin() {
    const response = await fetch(`https://blog-api-goph.fly.dev/api/users/login`, {
      method: `POST`,
      body: JSON.stringify({username, password})
    })
    if(response.ok){
      const data = await response.json();
      localStorage.setItem("token", data.token)
    }
  }

  return(
    <div className="login">
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;