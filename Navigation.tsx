import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaClock, FaQuestion, FaFlask } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

const links = [
  { to: '/Kanbas/Account', icon: FaUser, label: 'Account', iconClass: 'text-white' },
  { to: '/Kanbas/Dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
  { to: '/Kanbas/Courses', icon: FaBook, label: 'Courses' },
  { to: '/Kanbas/Calendar', icon: FaCalendarAlt, label: 'Calendar' },
  { to: '/Labs', icon: FaFlask, label: 'Labs' },
  { to: '/Kanbas/Inbox', icon: FaInbox, label: 'Inbox' },
  { to: '/Kanbas/Help', icon: FaQuestion, label: 'Help' }
];

function KanbasNavigation() {
  const { pathname } = useLocation();

  return (
    <div className="list-group wd-kanbas-navigation" style={{ width: '110px', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
      <Link to="/Kanbas" className="list-group-item border-0 bg-black text-center py-4">
        <img src="/images/neulogo.svg" alt="N Logo" width="60px" />
      </Link>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`list-group-item border-0 text-center py-3 ${
            pathname.includes(link.label) ? 'bg-white text-danger' : 'bg-black text-white'
          }`}
        >
          <link.icon className={`fs-2 ${link.iconClass || 'text-danger'}`} />
          <div className="small mt-1">{link.label}</div>
        </Link>
      ))}
    </div>
  );
}

export default KanbasNavigation;