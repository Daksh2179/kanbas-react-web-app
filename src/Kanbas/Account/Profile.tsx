import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { RootState } from "../store";

export default function Profile() {
  // Set initial profile state to align with the structure in initialState in the Redux store
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "",  // Matches the default role in initialState
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);


  // Load currentUser into profile on component mount
  const fetchProfile = () => {
       if (!currentUser) return navigate("/Kanbas/Account/Signin");
   
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
              email: ""
       }));
       navigate("/Kanbas/Account/Signin");
     };
   
     const saveProfile = () => {
       dispatch(setCurrentUser(profile));
     };
   
     useEffect(() => {
       fetchProfile();
     }, [currentUser]);
   
     return (
       <div id="wd-profile-screen">
         <h3>Profile</h3>
         {profile && (
           <div>
             <input
               value={profile.username}
               id="wd-username"
               className="form-control mb-2"
               onChange={(e) => setProfile({ ...profile, username: e.target.value })}
             />
             <input
               value={profile.password}
               id="wd-password"
               className="form-control mb-2"
               onChange={(e) => setProfile({ ...profile, password: e.target.value })}
             />
             <input
               value={profile.firstName}
               id="wd-firstname"
               className="form-control mb-2"
               onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
             />
             <input
               value={profile.lastName}
               id="wd-lastname"
               className="form-control mb-2"
               onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
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
             />
             <select
               value={profile.role}
               onChange={(e) => setProfile({ ...profile, role: e.target.value })}
               className="form-control mb-2"
               id="wd-role"
             >
               <option value="USER">User</option>
               <option value="ADMIN">Admin</option>
               <option value="FACULTY">Faculty</option>
               <option value="STUDENT">Student</option>
             </select>
             <button onClick={saveProfile} className="btn btn-primary w-100 mb-2" id="wd-save-btn">
               Save Profile
             </button>
             <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
               Sign out
             </button>
           </div>
         )}
       </div>
     );
   }