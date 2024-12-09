import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = [
    { label: "Signin", path: "/Kanbas/Account/Signin" },
    { label: "Signup", path: "/Kanbas/Account/Signup" },
    { label: "Profile", path: "/Kanbas/Account/Profile" },
    { label: "Users", path: "/Kanbas/Account/Users" },
  ];
  const { pathname } = useLocation();

  function active(arg0: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group fs-4 rounded-0 d-none d-sm-block"
    >
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.path}
          className={`list-group-item ${
            pathname.includes(link.label) ? "active" : "text-danger"
          } border border-0`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}