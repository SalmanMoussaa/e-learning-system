import React from "react";
import { getAPI, postAPI } from "../API/API";
import { useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import "../../pages/Signin_signup/Signin_signup";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let nav = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    const data_signin = { email: email, password: password };
    const url = "http://127.0.0.1:8000/auth/login",
      response = await postAPI(url, data_signin);
    console.log(response);
    localStorage.setItem("token", response.data.token);
    let user = jwt_decode(response.data.token);
    console.log(user.role);
    try {
      if (user.role === "admin") {
        toast.success(`You Are Now Logged in.`);
        nav("/admin");
      } else {
        toast.success(`You Are Now Logged in.`);
        nav("/studentMain");
      }
      setEmail("");
      setPassword("");
    } catch {
      console.log("error");
      toast.error("Failed.");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form>
        <h1 className="title">Sign In</h1>
        <span className="span">Already have an account? </span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignin} className="btn-signin">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;