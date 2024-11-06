import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { RootState } from "../store";
import "./style.css"
// Define Profile State Type
interface ProfileState {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: string;
}

export default function Profile() {
  // Set initial profile state to align with the structure in initialState in the Redux store
  const [profile, setProfile] = useState<ProfileState>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // Load currentUser into profile on component mount or when currentUser changes
  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/Kanbas/Account/Signin");
      return;
    }

    // Merge the currentUser data with default values
    setProfile({
      username: currentUser.username || "",
      password: currentUser.password || "",
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      dob: currentUser.dob || "",
      email: currentUser.email || "",
      role: currentUser.role || "",
    });
  };

  const signout = () => {
    dispatch(setCurrentUser({
      role: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
    }));
    navigate("/Kanbas/Account/Signin");
  };

  const saveProfile = () => {
    dispatch(setCurrentUser(profile));
    navigate("/Kanbas/Account/Signin"); // After saving the profile, redirect to signin
  };

  // Ensure profile is fetched when component mounts or when currentUser changes
  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  return (
    <div id="wd-profile-screen" className="container">
      <h3 className="text-center mb-4">Profile</h3>
      {profile && (
        <div>
          <div className="mb-3">
            <label htmlFor="wd-username" className="form-label">Username</label>
            <input
              value={profile.username}
              id="wd-username"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-password" className="form-label">Password</label>
            <input
              value={profile.password}
              id="wd-password"
              type="password"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-firstname" className="form-label">First Name</label>
            <input
              value={profile.firstName}
              id="wd-firstname"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-lastname" className="form-label">Last Name</label>
            <input
              value={profile.lastName}
              id="wd-lastname"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-dob" className="form-label">Date of Birth</label>
            <input
              value={profile.dob}
              id="wd-dob"
              type="date"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-email" className="form-label">Email</label>
            <input
              value={profile.email}
              id="wd-email"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wd-role" className="form-label">Role</label>
            <select
              value={profile.role}
              id="wd-role"
              className="form-select"
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          <div className="mb-3">
            <button onClick={saveProfile} className="btn btn-primary w-100">
              Save Profile
            </button>
          </div>
          <div className="mb-3">
            <button onClick={signout} className="btn btn-danger w-100">
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
