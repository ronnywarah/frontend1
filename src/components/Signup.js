

// src/components/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import './Signup.css';


function Signup() {
  // eslint-disable-next-line no-unused-vars
  const history = useNavigate(); // Add a comment to ignore the warning for unused variable

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        username,
        email,
        phone,
        password,
      });
  
      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data === "notexist") {
        alert("Registered successfully!");
        // Optionally, you can clear the form fields after successful registration
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up.");
    }
  }
  

  return (
    <div className="signup">
        <div className="logo">
            <img class="image" src="https://i.postimg.cc/CLdpsq5h/Wifi-provider-removebg-preview.png" alt="Wifi-provider"></img>
            </div>
      <h1>Signup</h1>
      <form onSubmit={submit}>
                <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="icon" /><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                </div>
                <div className="input-group">
                <FontAwesomeIcon icon={faEnvelope} className="icon" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="input-group">
                <FontAwesomeIcon icon={faPhone} className="icon" /><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                </div>
                <div className="input-group">
                <FontAwesomeIcon icon={faLock} className="icon" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <input type="submit" value="Register" />
            </form>
            <p>I have an Account !</p><Link to="/">Login</Link>
        </div>
    );
}

export default Signup;
