//import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Feed from './components/Feed';
import Post from './components/Post';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/posts/:postId' element={<Post/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
