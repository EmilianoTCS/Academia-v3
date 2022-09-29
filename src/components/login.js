import React, { useState } from "react";
import { useEffect } from "react";
import "./css/Login.css";
import loginServices from "./services/login";
import checkLoginService from "./services/checkLogin";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginServices.login({
        username,
        password,
      });
      checkLoginService.CheckLogin(user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  window.localStorage.setItem("loggedUser", JSON.stringify(user));

  useEffect(() => {
    const loggedStatus = window.localStorage.getItem("loggedUser");
    if ("loggedUser") {
      const user = JSON.parse(loggedStatus);
      setUser(user);
    }
  }, [user]);

  return user ? (
    <Route>
      <Redirect to="/home"></Redirect>
    </Route>
  ) : (
    <div className="container">
      <div id="background">
        <form id="form_login" onSubmit={handleLogin}>
          <h3>Login</h3>
          <div>
            <h4 htmlFor="input_Usuario">Usuario:</h4>
            <input
              type="text"
              name="username"
              id="input_Usuario"
              placeholder="Usuario"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <h4 htmlFor="input_Usuario">Contraseña:</h4>
            <input
              type="password"
              name="password"
              id="input_password"
              placeholder="Contraseña"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type="submit" id="btn_acceder" className="btn btn-primary">
              Acceder
            </button>
            <a id="forgot_password" className="small" href="password.html">
              Olvidaste la contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
