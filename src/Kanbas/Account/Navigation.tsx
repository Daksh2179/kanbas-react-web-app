import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css"

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link 
        to="/Kanbas/Account/Signin" 
        className="list-group-item wd-kanbas-nav-item border border-0"
      >
        <span className="wd-kanbas-nav-link">Signin</span>
      </Link>
      <Link 
        to="/Kanbas/Account/Signup" 
        className="list-group-item wd-kanbas-nav-item border border-0"
      >
        <span className="wd-kanbas-nav-link">Signup</span>
      </Link>
      <Link 
        to="/Kanbas/Account/Profile" 
        className="list-group-item wd-kanbas-nav-item border border-0"
      >
        <span className="wd-kanbas-nav-link">Profile</span>
      </Link>
    </div>
  );
}