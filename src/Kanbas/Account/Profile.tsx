import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-5">
      <h3 className="mb-4">Profile</h3>
      <div className="mb-3">
        <input id="wd-username" className="form-control" value="alice" placeholder="username" />
      </div>
      <div className="mb-3">
        <input id="wd-password" className="form-control" value="123" placeholder="password" type="password" />
      </div>
      <div className="mb-3">
        <input id="wd-firstname" className="form-control" value="Alice" placeholder="First Name" />
      </div>
      <div className="mb-3">
        <input id="wd-lastname" className="form-control" value="Wonderland" placeholder="Last Name" />
      </div>
      <div className="mb-3">
        <input id="wd-dob" className="form-control" value="2000-01-01" type="date" />
      </div>
      <div className="mb-3">
        <input id="wd-email" className="form-control" value="alice@wonderland" type="email" placeholder="Email" />
      </div>
      <div className="mb-3">
        <select id="wd-role" className="form-select">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>
      <Link to="/Kanbas/Account/Signin" className="btn btn-danger w-100">Sign out</Link>
    </div>
  );
}