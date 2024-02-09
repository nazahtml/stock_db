import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from "./components/Login";
import Registre from "./components/Registre";
import Dashboard from "./components/Dashboard";
import PwdModify from "./components/PwdModify";
import GesUsers from "./components/GesUsers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css'
import Accueille from "./components/navLinks/Accueille";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  async function authentificated() {
    try {
      const response = await fetch('http://localhost:4000/auth/verify', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      })
      const parseRes = await response.json()
      parseRes === true ? setIsAuth(true) : setIsAuth(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    authentificated();
  }, [])

  return (
    <div className={isAuth===true?"container":"login"}>
      <BrowserRouter>
       
          {isAuth &&  <nav className="ba3id"><Dashboard setIsAuth={setIsAuth}/></nav>}
        
        <Routes>
          <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to='/dashboard' />} />
          <Route path="/dashboard" element={isAuth ? <Accueille/> : <Navigate to='/login' />} />
          <Route path="/Utilisateurs" element={isAuth ? <GesUsers /> : <Navigate to='/login' />} />
          <Route path="/Utilisateurs/ajouter" element={isAuth ? <Registre /> : <Navigate to='/login' />} />
          <Route path="/modifier-le-mot-de-passe" element={isAuth ? <PwdModify /> : <Navigate to='/login' />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
