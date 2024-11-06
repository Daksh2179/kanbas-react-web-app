import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();

  // Updated links array with names and icons
  const links = [
    { name: "Home", icon: <AiOutlineDashboard /> },
    { name: "Modules", icon: <LiaBookSolid /> },
    { name: "Piazza", icon: <FaInbox /> },
    { name: "Zoom", icon: <IoCalendarOutline /> },
    { name: "Assignments", icon: <LiaCogSolid /> },
    { name: "Quizzes", icon: <IoCalendarOutline /> },
    { name: "Grades", icon: <FaRegCircleUser /> },
    { name: "People", icon: <FaRegCircleUser /> },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.name} // add a unique key
          id={`wd-course-${link.name.toLowerCase()}-link`}
          to={`/Kanbas/Courses/${cid}/${link.name}`}
          className={`list-group-item ${
            pathname.includes(link.name) ? "active" : "text-danger"
          } border border-0 mb-4`}
        >
          <span className="me-2">{link.icon}</span> {/* Icon next to link */}
          {link.name}
        </Link>
      ))}
    </div>
  );
}