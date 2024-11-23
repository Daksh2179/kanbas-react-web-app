import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { User, isValidRole } from "../Database";
import * as client from "./client";
export default function Profile() {
  const [profile, setProfile] = useState<User | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };


  useEffect(() => {
    // Moved fetchProfile logic inside useEffect to avoid dependency issues
    if (!currentUser) {
      navigate("/Kanbas/Account/Signin");
      return;
    }
    setProfile(currentUser as User);
  }, [currentUser, navigate]); // Include all dependencies

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  if (!profile) {
    return null;
  }

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <div>
        <input
          value={profile.username}
          id="wd-username"
          className="form-control mb-2"
          onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })
          }
        />
        <input
          value={profile.password}
          id="wd-password"
          className="form-control mb-2"
          type="password"
          onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })
          }
        />
        <input
          value={profile.firstName}
          id="wd-firstname"
          className="form-control mb-2"
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />
        <input
          value={profile.lastName}
          id="wd-lastname"
          className="form-control mb-2"
          onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })
          }
        />
        <input
          value={profile.dob}
          id="wd-dob"
          className="form-control mb-2"
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          type="date"
        />
        <input
          value={profile.email}
          id="wd-email"
          className="form-control mb-2"
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          type="email"
        />
        <select
          value={profile.role}
          onChange={(e) => {
            const role = e.target.value;
            if (isValidRole(role)) {
              setProfile({ ...profile, role });
            }
          }}
          className="form-control mb-2"
          id="wd-role"
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="TA">Teaching Assistant</option>
        </select>
        
        <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
        
        <button
          onClick={signout}
          className="btn btn-danger w-100 mb-2"
          id="wd-signout-btn"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}