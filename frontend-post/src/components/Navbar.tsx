import { ReactNode } from "react";
import { Link } from "react-router-dom";

function Navbar(): ReactNode {
  const logout = () => {
    localStorage.removeItem('token')
    console.log('Logged out successfully')
  }

  if(!localStorage.getItem('token')){
    return (
      <div className="navbar">
        <Link to='/login'>Log in</Link>
      </div>
    )
  }

  return (
    <div className="navbar">
      <a href="#" onClick={logout}>Log out</a>
    </div>
  )
}

export default Navbar;