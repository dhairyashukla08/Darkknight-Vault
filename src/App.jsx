import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import "./App.css"

import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import {ToastContainer,toast} from "react-toastify"

const App = () => {
  return (
    <>
    <ToastContainer/>
  <Router>
    <Routes>
      <Route path='/' element={<SignUpPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App