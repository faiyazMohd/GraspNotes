import React, { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alerts/AlertContext";  
import jwt_decode from "jwt-decode";
import NoteContext from "../context/notes/NoteContext";


const  BASE_URL = process.env.REACT_APP_BASE_URL;

const SignUp = () => {
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const [signupCred, setSignupCred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  }); 
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const {setUserEmail} = context;

  const handleOnChange = (event) => {
    setSignupCred({ ...signupCred, [event.target.name]: event.target.value });
  };
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    if (signupCred.password === signupCred.cpassword) {
      const response = await fetch(
        `${BASE_URL}/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signupCred.name,
            email: signupCred.email,
            password: signupCred.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
      localStorage.setItem("userEmail",signupCred.email);

        setUserEmail(signupCred.email)
        navigate("/");
        setSignupCred({ name: "", email: "", password: "" });
      }
      showAlert(json.success, json.msg);
    }
    else{
        showAlert(false, "Password and Confirm Password does not match");
    }
  };

  // Addin Login with google 
  const clientID =process.env.REACT_APP_CLIENT_ID;
  const handleCredentialResponse =  async (googleResponse)=> {
    // console.log("Encoded JWT ID token : " + response.credential);
    let userObject = jwt_decode(googleResponse.credential);
    // console.log(userObject);
    // setUserGoogle(userObject); 
    const response = await fetch(`${BASE_URL}/api/auth/googlesignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userObject.name,
        email: userObject.email
      }),
    });
    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("userEmail",userObject.name);
      setUserEmail(userObject.email)
      navigate("/");
    }
    showAlert(json.success, json.msg);
  }
  
 
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { 
        'scope': 'profile email',
        'width': 150,
        'height': 70,
        'longtitle': false,
        'theme': 'dark',
      }// customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, );
  return (
    <div className="container"  style={{minHeight:"90vh"}}>
      <h1>SignUp to GraspNotes</h1>
      <form onSubmit={handleSignupSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={signupCred.name}
            onChange={handleOnChange}
            required
            minLength={3}
          />
        </div>
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
            value={signupCred.email}
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
            value={signupCred.password}
            onChange={handleOnChange}
            required
            minLength={4}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={signupCred.cpassword}
            onChange={handleOnChange}
            required
            minLength={4}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <h4 className="text-center">OR</h4>
        <div className="container my-3 d-flex justify-content-center align-items-center">
          <div id="signInDiv"></div>
        </div>
    </div>
  );
};

export default SignUp;
