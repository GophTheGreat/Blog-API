//import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Register from './components/Register';
import WritePost from './components/WritePost';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          {isLoggedIn === true ? <Route path='/' element={<WritePost/>}/> : null}
          <Route path='/login' element={<Login/>} />, 
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
