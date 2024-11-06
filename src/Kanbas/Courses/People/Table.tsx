import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaEllipsisV } from "react-icons/fa";
import { Enrollment, User, RootState } from "../../Database";

interface PeopleTableProps {}

export default function PeopleTable({}: PeopleTableProps) {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Type-safe selectors
  const users = useSelector((state: RootState) => state.people.users);
  const enrollments = useSelector((state: RootState) => state.people.enrollments);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  // Filter enrollments for current course
  const courseEnrollments = enrollments.filter(
    (e: Enrollment) => e.course.trim() === cid?.trim()
  );

  // Group users by role for better organization
  const groupedUsers = courseEnrollments.reduce((acc: Record<string, User[]>, enrollment) => {
    const user = users.find((u) => u._id === enrollment.user);
    if (user) {
      if (!acc[user.role]) {
        acc[user.role] = [];
      }
      acc[user.role].push(user);
    }
    return acc;
  }, {});

  const handleEnrollmentAction = (userId: string, action: 'remove' | 'update') => {
    if (!cid) return;
    
    if (action === 'remove') {
      dispatch({ 
        type: 'REMOVE_ENROLLMENT',
        payload: { courseId: cid, userId } 
      });
    } else if (action === 'update') {
      dispatch({ 
        type: 'UPDATE_ENROLLMENT',
        payload: { courseId: cid, userId, status: 'active' } 
      });
    }
  };

  const handleAddEnrollment = () => {
    setShowModal(true);
  };

  // Type-safe permission check
  const canModifyEnrollments = currentUser?.role === 'FACULTY' || currentUser?.role === 'TA';

  // Rest of the component remains the same...
  return (
    <div className="wd-people-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>People</h3>
        {canModifyEnrollments && (
          <button 
            className="btn btn-primary" 
            onClick={handleAddEnrollment}
          >
            + Add People
          </button>
        )}
      </div>

      <div className="table-responsive" id="wd-people-table">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Login ID</th>
              <th>Role</th>
              <th>Last Activity</th>
              <th>Total Activity</th>
              {canModifyEnrollments && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedUsers).map(([role, users]) => (
              <React.Fragment key={role}>
                <tr className="table-secondary">
                  <td colSpan={canModifyEnrollments ? 6 : 5}>
                    <strong>{role}</strong> ({users.length})
                  </td>
                </tr>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="wd-full-name">
                      <div className="d-flex align-items-center">
                        <FaUserCircle className="me-2 fs-3 text-secondary" />
                        <div>
                          <span className="wd-first-name">{user.firstName}</span>{" "}
                          <span className="wd-last-name">{user.lastName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="wd-login-id">{user.loginId}</td>
                    <td className="wd-role">{user.role}</td>
                    <td className="wd-last-activity">{user.lastActivity}</td>
                    <td className="wd-total-activity">{user.totalActivity}</td>
                    {canModifyEnrollments && (
                      <td>
                        <div className="dropdown">
                          <button 
                            className="btn btn-link" 
                            data-bs-toggle="dropdown"
                            aria-label="User actions"
                          >
                            <FaEllipsisV />
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleEnrollmentAction(user._id, 'remove')}
                              >
                                Remove
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowModal(true);
                                }}
                              >
                                Edit Role
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}