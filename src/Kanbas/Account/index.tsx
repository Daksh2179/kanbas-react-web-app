import Profile from "./Profile";
import Signin from "./Signin";
import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import Dashboard from "../Dashboard";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-screen">
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route
                path="/"
                element={<Navigate to={currentUser ? "/Kanbas/Dashboard" : "/Kanbas/Account/Signin"} />}
              />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Dashboard" element={<Dashboard />} />  {/* Add this route */}
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}