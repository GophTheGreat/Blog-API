import { FormEvent, ReactNode } from "react";
import { redirect } from "react-router-dom";

function Register():ReactNode {

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")
    const admin = formData.get("admin") === 'on';

    //first compare that the passwords match
    if(password === confirmPassword){
      const body = JSON.stringify({
        username: username, 
        password: password,
        confirmPassword: confirmPassword, 
        admin: admin
      })
      console.log(body);
      const response = await fetch(`https://blog-api-goph.fly.dev/api/users`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
      if(response.ok){
        return redirect('/login')
      } else {
        //Handle the error response
        console.log(response.json());
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
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="text" name="confirmPassword" id="confirmPassword" />
        </div>
        <div>
          <label htmlFor="admin">Are you an admin?</label>
          <input type="checkbox" name="admin" id="admin"/>
        </div>
        <button type='submit'>Register new account</button>
      </form>
    </div>
  )
}

export default Register;