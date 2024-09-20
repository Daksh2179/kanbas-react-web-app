import React from 'react';
import { Link } from "react-router-dom";

export default function KanbasNavigation() {
  return (
    <nav id="wd-kanbas-navigation">
      <ul>
        <li>
          <a href="https://www.northeastern.edu/" 
             id="wd-neu-link" 
             target="_blank" 
             rel="noopener noreferrer">
            Northeastern
          </a>
        </li>
        <li>
          <Link to="/Kanbas/Account" id="wd-account-link">Account</Link>
        </li>
        <li>
          <Link to="/Kanbas/Dashboard" id="wd-dashboard-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/Kanbas/Courses" id="wd-course-link">Courses</Link>
        </li>
        <li>
          <Link to="/Kanbas/Calendar" id="wd-calendar-link">Calendar</Link>
        </li>
        <li>
          <Link to="/Kanbas/Inbox" id="wd-inbox-link">Inbox</Link>
        </li>
        <li>
          <Link to="/Labs" id="wd-labs-link">Labs</Link>
        </li>
      </ul>
    </nav>
  );
}