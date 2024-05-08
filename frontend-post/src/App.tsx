//import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Navbar/>} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
