import React, { useState } from 'react';
import './Signup.css'; 
import { Assets } from '../../utils/assets';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async(e) => {

    e.preventDefault();
    let formData = {
      username:username,
      email:email,
      password:passowrd
    }

    let url = 'http://localhost:3000/api/admin/Signup';

    try {
      const response = await axios.post(url, formData);
      alert(response.data.message)
      console.log("Response data:", response.data);
      setUsername("");
      setEmail("");
      setPassword("");
      navigate('/');
    } catch (error) {
      console.error("Error occurred:", error);
    }

  };

  return (
    <div className="form-container">
      <div className="header">
        <img
          src={Assets.logo}
          alt="Web Plus Academy"
          className="logo"
        />
      </div>

      <form className="form" onSubmit={submitHandler} >

{/* -------------------- username input------------------ */}
        <div className="form-group">
          <label htmlFor="username">Username</label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            placeholder="enter your username"
          />

        </div>
{/* -----------email input----------------------- */}
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           type="email"
           id="email"
            placeholder="enter your email id" />
        </div>
{/* -------------- password input------------------------- */}
        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
           value={passowrd}
           onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="enter your password"
          />
        </div>

{/* ------------------- Submit button--------------------- */}
        <button type="submit" className="submit-btn">
          SUBMIT
        </button>

      </form>
{/* ------------------------------------------------------       */}
      <div className="footer">
        <span>Already have an account?</span>
        <Link to="/" className="register-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
