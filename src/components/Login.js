import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

function Login() {
    const history = useNavigate();
    const [identifier, setIdentifier] = useState(''); // Allow users to enter either email or username
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/login", {
                identifier,
                password
            })
            .then(res => {
                if (res.data === "exist") {
                    history("/home", { state: { id: identifier } });
                } else if (res.data === "notexist") {
                    alert("User does not exist or incorrect credentials.");
                }
            })
            .catch(e => {
                alert("An error occurred while logging in.");
                console.log(e);
            });
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="login">
            <div className="logo">
            <img src="https://i.postimg.cc/CLdpsq5h/Wifi-provider-removebg-preview.png" alt="Wifi-provider"></img>
            </div>
            <h1>Login</h1>
            <form onSubmit={submit}>
            <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="icon" /><input type="text" onChange={(e) => setIdentifier(e.target.value)} placeholder="Email or Username" />
            </div>
            <br />
                <div className="input-group">
                <FontAwesomeIcon icon={faLock} className="icon" /><input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <br />
            <p>Create an Account !</p> <Link to="/signup">Register</Link>
        </div>
    );
}

export default Login;
