// React component

import React, { useState } from "react";
import "../styles/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { email, password };
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const parseRes = await response.json();

      if (response.ok) {
        setIsAuth(true);
      } else {
        setErrors("invalid email or password");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container-login">
      <div className="cp-img">
        <img src="logo_cp.png" alt="" />
      </div>
      <div className="wraper">
        <form onSubmit={handleLogin}>

          <h1 className="title text-4xl text-center">S'indentifier</h1>
          <div className="input-box">
            <input
              aria-describedby="emailHelp"
              type="email" required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="name">Votre adresse Email</label>
            <ion-icon name="person"></ion-icon>
          </div>

          <div className="input-box">
            <input
              type={showPassword ? 'text' : 'password'} required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="name">Votre Mot de Passe</label>
            <ion-icon name="lock-closed"></ion-icon>
          </div>
          {errors.length > 0 && (
            <div className="text-red-500 mb-1" role="alert">
              {errors}
            </div>
          )}
          <button type="submit" className="btn">
            Se connecter
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
