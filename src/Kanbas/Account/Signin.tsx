import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { user, User } from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = () => {
    const foundUser = user.find(
      (u: User) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    
    if (!foundUser) {
      alert("Invalid credentials");
      return;
    }
    
    dispatch(setCurrentUser(foundUser));
    navigate("/Kanbas/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>

      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        id="wd-username"
        placeholder="Username"
        className="form-control mb-2"
      />

      <input
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        id="wd-password"
        placeholder="Password"
        type="password"
        className="form-control mb-2"
      />

      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
        Don't have an account? Sign up
      </Link>
    </div>
  );
}