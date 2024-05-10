import { ReactNode, useState } from "react";
import { redirect } from "react-router-dom";

function Register():ReactNode {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [confirmPassword, setConfirmPassword] = useState(``);
  const [admin, setAdmin] = useState(false);

  async function handleRegister() {
    //first compare that the passwords match
    if(password === confirmPassword){
      const body = JSON.stringify({
        username: username, 
        password: password, 
        confirmPassword: confirmPassword, 
        admin: admin
      })
      console.log(body);
      const response = await fetch(`https://blog-api-goph.fly.dev/api/users/`, {
        method: `POST`,
        body: body
      })
      if(response.ok){
        return redirect('/login')
      } else {
        // Handle the error response
        const errorData = await response.json();
        const errorMessage = errorData.errors.join(', ')
        alert(errorMessage);
      }
    } else {
      alert("Passwords don't match");
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
        <div>
          <label htmlFor="admin">Are you an admin?</label>
          <input type="checkbox" name="admin" id="admin" onChange={(e) => setAdmin(e.target.checked)}/>
        </div>
        <button onClick={handleRegister}>Register new account</button>
      </form>
    </div>
  )
}

export default Register;