import React from 'react';
import { FaEllipsisV, FaCheckCircle, FaEdit, FaCaretDown, FaSearch, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAssignment } from './reducer';
import "./style.css";

interface Assignment {
  _id: string;
  name: string;
  description: string;
  points: number;
  group: string;
  gradeDisplay: string;
  submissionType: string;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string; // Course ID associated with the assignment
}

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
}

interface AssignmentsProps {
  course: Course; // Ensure to include course prop here
}

interface RootState {
  assignments: {
    assignments: Assignment[];
  };
}

export default function Assignments() {
  const assignments = useSelector((state: { assignments: { assignments: any[] } }) => state.assignments.assignments); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(id));
    }
  };

  return (
    <div className="wd-assignments">
      <div className="wd-assignments-header d-flex justify-content-between align-items-center mb-3">
        <div className="wd-search-group position-relative">
          <input
            id="wd-search-assignment"
            className="form-control wd-search-input"
            placeholder="Search for Assignments"
          />
          <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted" />
        </div>
        <div className="wd-button-group">
          {/* Navigate to AssignmentEditor for creating a new assignment */}
          <button onClick={() => navigate("/Kanbas/Assignments/Editor")} className="btn btn-danger me-2">+ Assignment</button>
          <button id="wd-add-assignment-group" className="btn btn-outline-secondary">+ Group</button>
        </div>
      </div>
      <div className="wd-assignments-content border rounded">
        <div className="wd-assignments-title d-flex justify-content-between align-items-center p-2 bg-light border-bottom">
          <h2 id="wd-assignments-title" className="d-flex align-items-center mb-0 fs-5">
            <FaEllipsisV className="me-2" />
            ASSIGNMENTS
            <FaCaretDown className="ms-2" />
          </h2>
        </div>
        <ul id="wd-assignment-list" className="wd-assignments-list list-unstyled m-0">
          {assignments.map((assignment) => (
            <li key={assignment._id} className="wd-assignment-item border-bottom p-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <FaEllipsisV className="me-2 text-muted" />
                  <FaEdit className="text-success me-2" />
                  <div className="wd-assignment-details">
                    {/* Navigate to AssignmentEditor with assignment ID for editing */}
                    <Link
                      className="wd-assignment-name text-decoration-none text-dark fw-bold"
                      to={`/Kanbas/Assignments/Editor/${assignment._id}`}>
                      {assignment.name}
                    </Link>
                    <div className="text-muted small">
                      <span className="text-danger">Multiple Modules</span> | Not available until {new Date(assignment.availableFrom).toLocaleDateString()} at 12:00am |
                    </div>
                    <div className="text-muted small">
                      Due {new Date(assignment.dueDate).toLocaleDateString()} at 11:59pm | {assignment.points} pts
                    </div>
                  </div>
                </div>
                <div className="wd-assignment-actions d-flex align-items-center">
                  <FaCheckCircle className="text-success me-2" />
                  {/* Add delete button with confirmation */}
                  <button onClick={() => handleDelete(assignment._id)} className="btn btn-link text-danger">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}