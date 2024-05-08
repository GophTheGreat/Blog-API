import { ReactNode, useState } from "react";

function Register():ReactNode {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [confirmPassword, setConfirmPassword] = useState(``);

  async function handleRegister() {
    //first compare that the passwords match
    if(password === confirmPassword){
      const response = await fetch(`https://blog-api-goph.fly.dev/api/users/`, {
        method: `POST`,
        body: JSON.stringify({username, password, confirmPassword})
      })
      if(response.ok){
        const data = await response.json();
        localStorage.setItem("token", data.token)
      }
    } else {
      //do stuff if the passwords don't match
    }
  }

  return(
    <div className="register">
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="text" name="confirmPassword" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>
        <button onClick={handleRegister}>Register new account</button>
      </form>
    </div>
  )
}

export default Register