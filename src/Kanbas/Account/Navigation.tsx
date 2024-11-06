import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  return (
    <div id="wd-account-navigation">
      <nav className="nav flex-column">
        <Link to="/Kanbas/Account/Signin" className="nav-link">
          Sign In
        </Link>
        {!currentUser && (
          <Link to="/Kanbas/Account/Signup" className="nav-link">
            Sign Up
          </Link>
        )}
        {currentUser && (
          <>
            <Link to="/Kanbas/Account/Profile" className="nav-link">
              Profile
            </Link>
            <button
              onClick={() => {
                // Sign out logic: clear the current user in the state and navigate to sign-in page
                localStorage.removeItem("user"); // Assuming you save user data in localStorage or Redux
                window.location.href = "/Kanbas/Account/Signin";
              }}
              className="nav-link btn btn-link"
            >
              Sign Out
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
