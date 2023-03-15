import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alerts/AlertContext";
import { Link } from "react-router-dom";
const  BASE_URL = process.env.REACT_APP_BASE_URL;
const Login = () => {
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    setLoginCred({ ...loginCred, [event.target.name]: event.target.value });
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginCred.email,
        password: loginCred.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      setLoginCred({ email: "", password: "" });
    }
    showAlert(json.success, json.msg);
  };
  return (
    <div className="container">
      <h1>Login to GraspNotes</h1>
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={loginCred.email}
            onChange={handleOnChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={loginCred.password}
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <div className="mb-3 my-2">
          <div id="emailHelp" className="form-text">
            No GraspNotes Account ?{" "}
            <div className="btn btn-sm btn-primary">
              <Link className="navbar-brand" to="/signup">
              SignUp
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
