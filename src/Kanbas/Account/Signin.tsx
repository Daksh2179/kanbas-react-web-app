import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
import axios from "axios";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Account/Profile");
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        console.error("Axios error details:", error.response);
        console.error("Axios error message:", error.message);
        console.error("Axios error status:", error.response?.status);
        console.error("Axios error data:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>

      <input
        defaultValue={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        id="wd-username"
        placeholder="username"
        className="form-control mb-2"
      />

      <input
        defaultValue={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        id="wd-password"
        placeholder="password"
        type="password"
        className="form-control mb-2"
      />

      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100"
      >
        Sign in{" "}
      </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
        Don't have an account? Sign up
      </Link>
    </div>
  );
}