import React from 'react';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route, Navigate
} from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">

        <Routes>
          {
            !isLoggedIn ? (
              <Route exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />) :
              <Route path='/' element={<Navigate replace to='/home' />} />
          }
          {!isLoggedIn ? (
            <Route exact path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />) :
            <Route path='/register' element={<Navigate replace to='/home' />} />
          }
          {
            isLoggedIn ? (<Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn} />} />)
              : (
                // <Route exact path="/"  element={<Login setIsLoggedIn ={setIsLoggedIn} />} /> )
                <Route path='/home' element={<Navigate replace to='/' />} />)
          }
        </Routes>

      </div >
    </Router>
  );
};

export default App;

