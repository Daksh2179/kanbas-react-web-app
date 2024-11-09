import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { user, User, isValidRole } from "../Database";

export default function Signup() {
  const [credentials, setCredentials] = useState<Partial<User>>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
    dob: "",
    loginId: "",
    section: "",
    lastActivity: new Date().toISOString(),
    totalActivity: "0"
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = () => {
    if (!credentials.username || !credentials.password) {
      alert("Username and password are required");
      return;
    }
    
    const newUser: User = {
      ...credentials,
      _id: new Date().getTime().toString(),
      loginId: credentials.username || "",
      section: "0",
      lastActivity: new Date().toISOString(),
      totalActivity: "0",
    } as User;
    
    // Add user to database
    user.push(newUser);
    
    // Log them in
    dispatch(setCurrentUser(newUser));
    navigate("/Kanbas/Dashboard");
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <input
        value={credentials.firstName}
        onChange={(e) =>
          setCredentials({ ...credentials, firstName: e.target.value })
        }
        placeholder="First Name"
        className="form-control mb-2"
      />
      <input
        value={credentials.lastName}
        onChange={(e) =>
          setCredentials({ ...credentials, lastName: e.target.value })
        }
        placeholder="Last Name"
        className="form-control mb-2"
      />
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
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        placeholder="Email"
        type="email"
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
      <input
        value={credentials.dob}
        onChange={(e) =>
          setCredentials({ ...credentials, dob: e.target.value })
        }
        type="date"
        className="form-control mb-2"
      />
      <select
        value={credentials.role}
        onChange={(e) => {
          const role = e.target.value;
          if (isValidRole(role)) {
            setCredentials({ ...credentials, role });
          }
        }}
        className="form-control mb-2"
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
        <option value="TA">Teaching Assistant</option>
      </select>
      <button
        onClick={signup}
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </button>
      <Link id="wd-signin-link" to="/Kanbas/Account/Signin">
        Already have an account? Sign in
      </Link>
    </div>
  );
}