// PeopleTable.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { user, enrollment, isValidRole } from "../../Database";
import { FaUserCircle } from "react-icons/fa";
import { User, Enrollment } from "../../Database";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>(); // Get the course ID from the URL
  const users: User[] = user;
  const enrollments: Enrollment[] = enrollment;

  // Filter enrollments for the current course
  const courseEnrollments = enrollments.filter((e: Enrollment) => e.course.trim() === cid?.trim());

  return (
    <div id="wd-people-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {courseEnrollments.length > 0 ? (
            courseEnrollments.map((e: Enrollment) => {
              const u = users.find((u: User) => u._id === e.user);

              return u ? (
                <tr key={e._id}>
                  <td className="wd-full-name text-nowrap">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{u.firstName}</span>{" "}
                    <span className="wd-last-name">{u.lastName}</span>
                  </td>
                  <td className="wd-login-id">{u.loginId}</td>
                  <td className="wd-role">
                    {u.role && isValidRole(u.role) ? u.role : "Unknown"}
                  </td>
                  <td className="wd-last-activity">{u.lastActivity}</td>
                  <td className="wd-total-activity">{u.totalActivity}</td>
                </tr>
              ) : (
                <tr key={e._id}>
                  <td colSpan={5}>User not found for this enrollment</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>No enrollments found for this course</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
