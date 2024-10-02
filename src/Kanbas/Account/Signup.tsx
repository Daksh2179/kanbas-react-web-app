import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container mt-5">
      <h3 className="mb-4">Sign up</h3>
      <div className="mb-3">
        <input className="form-control" placeholder="username" />
      </div>
      <div className="mb-3">
        <input className="form-control" placeholder="password" type="password" />
      </div>
      <div className="mb-3">
        <input className="form-control" placeholder="verify password" type="password" />
      </div>
      <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100 mb-3">
        Sign up
      </Link>
      <Link to="/Kanbas/Account/Signin" className="d-block text-center">Sign in</Link>
    </div>
  );
}