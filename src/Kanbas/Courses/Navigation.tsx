import React from "react";
import { Link, useLocation } from "react-router-dom";
import './style.css';
import { FaHome, FaNetworkWired, FaBook, FaVideo, FaClipboardList, FaQuestionCircle, FaGraduationCap, FaUsers } from "react-icons/fa";

// Define the Course interface with the expected properties
interface Course {
  _id: string;
  name: string;
  number: string; // Ensure this matches your course data structure
}

interface NavigationProps {
  selectedCourse: Course; // Accepts a Course type as a prop
}

function Navigation({ selectedCourse }: NavigationProps) {
  const { pathname } = useLocation();

  const courseLinks = [
    { name: "Home", icon: FaHome },
    { name: "Modules", icon: FaNetworkWired },
    { name: "Piazza", icon: FaBook },
    { name: "Zoom", icon: FaVideo },
    { name: "Assignments", icon: FaClipboardList },
    { name: "Quizzes", icon: FaQuestionCircle },
    { name: "Grades", icon: FaGraduationCap },
    { name: "People", icon: FaUsers }
  ];

  return (
    <div className="nav-wrapper">
      <h5 className="mb-4 text-center" style={{ color: '#dc3545' }}>{selectedCourse.number}</h5>
      <ul className="nav flex-column">
        {courseLinks.map((link, index) => (
          <li
            key={index}
            className={`wd-kanbas-nav-item ${pathname.includes(link.name.toLowerCase()) ? "active" : ""}`}
          >
            <Link
              to={`/Kanbas/Courses/${selectedCourse._id}/${link.name}`}
              className="wd-kanbas-nav-link"
            >
              {/* Correctly render the icon */}
              {React.createElement(link.icon, { className: "wd-kanbas-nav-icon" })}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navigation;
