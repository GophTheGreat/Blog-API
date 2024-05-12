import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar(): ReactNode {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token')
    console.log('Logged out successfully')
    navigate('/');
  }

  if(!localStorage.getItem('token')){
    return (
      <div className="navbar">
        <Link to='/login'>Log in</Link>
        <Link to='/register'>Register</Link>
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