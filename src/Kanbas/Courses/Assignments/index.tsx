import React from 'react';
import { FaEllipsisV, FaCheckCircle, FaEdit, FaCaretDown, FaSearch } from 'react-icons/fa';
import "./style.css";

export default function Assignments() {
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
          <button id="wd-add-assignment-group" className="btn btn-outline-secondary me-2">+ Group</button>
          <button id="wd-add-assignment" className="btn btn-danger">+ Assignment</button>
        </div>
      </div>
      <div className="wd-assignments-content border rounded">
        <div className="wd-assignments-title d-flex justify-content-between align-items-center p-2 bg-light border-bottom">
          <h2 id="wd-assignments-title" className="d-flex align-items-center mb-0 fs-5">
            <FaEllipsisV className="me-2" />
            ASSIGNMENTS
            <FaCaretDown className="ms-2" />
          </h2>
          <div>
            <span className="wd-total-percentage badge bg-secondary me-2">40% of Total</span>
            <button className="btn btn-outline-secondary btn-sm me-2">+</button>
            <button className="btn btn-outline-secondary btn-sm"><FaEllipsisV /></button>
          </div>
        </div>
        <ul id="wd-assignment-list" className="wd-assignments-list list-unstyled m-0">
          {['A1', 'A2', 'A3'].map((assignment, index) => (
            <li key={assignment} className="wd-assignment-item border-bottom p-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <FaEllipsisV className="me-2 text-muted" />
                  <FaEdit className="text-success me-2" />
                  <div className="wd-assignment-details">
                    <a className="wd-assignment-name text-decoration-none text-dark fw-bold"
                      href={`#/Kanbas/Courses/1234/Assignments/${index + 123}`}>
                      {assignment}
                    </a>
                    <div className="text-muted small">
                      <span className="text-danger">Multiple Modules</span> | Not available until {new Date(2023, 4, index + 6).toLocaleDateString()} at 12:00am |
                    </div>
                    <div className="text-muted small">
                      Due {new Date(2023, 4, index + 13).toLocaleDateString()} at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
                <div className="wd-assignment-actions d-flex align-items-center">
                  <FaCheckCircle className="text-success me-2" />
                  <FaEllipsisV className="text-muted" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
