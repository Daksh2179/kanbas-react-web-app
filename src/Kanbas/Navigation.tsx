import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

const links = [
  { to: '/Kanbas/Account', icon: FaUser, label: 'Account', iconClass: 'text-danger' },
  { to: '/Kanbas/Dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
  { to: '/Kanbas/Courses', icon: FaBook, label: 'Courses' },
  { to: '/Kanbas/Calendar', icon: FaCalendarAlt, label: 'Calendar' },
  { to: '/Kanbas/Inbox', icon: FaInbox, label: 'Inbox' },
  { to: '/Labs', icon: FaCog, label: 'Labs' },
];

function KanbasNavigation() {
  const { pathname } = useLocation();

  return (
    <div className="wd-kanbas-navigation d-flex flex-column bg-black" style={{ width: '84px', position: 'fixed', left: 0, top: 0, bottom: 0, overflowY: 'auto' }}>
      <Link to="/Kanbas" className="p-2 text-center">
        <img src="/images/neulogo.svg" alt="N Logo" width="50" height="50" />
      </Link>
      {links.map((link) => {
        const isSelected = pathname.includes(link.label);
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`p-2 text-center text-decoration-none ${
              isSelected ? 'bg-white' : ''
            }`}
          >
            <link.icon 
              className={`fs-5 text-danger`} 
            />
            <div 
              className={`small mt-1 ${isSelected ? 'text-danger' : 'text-white'}`}
              style={{ fontSize: '0.65rem' }}
            >
              {link.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default KanbasNavigation;