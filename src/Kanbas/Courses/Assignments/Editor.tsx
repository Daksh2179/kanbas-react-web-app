import React from 'react';
import { FaCalendarAlt, FaCaretDown, FaTimes } from 'react-icons/fa';
import './style.css';

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <h2 className="mb-4">CS5610 SU1 24 MON/FRI {'>'} Assignments {'>'} A1</h2>
      <div className="row">
        <div className="col-md-8">
          <h3 className="text-danger mb-4">Assignment Name</h3>
          <input id="wd-name" className="form-control mb-3" value="A1" />
          <textarea id="wd-description" className="form-control mb-3" rows={6}>
            The assignment is available online
            Submit a link to the landing page of your Web application running on Netlify.
            The landing page should include the following:
            • Your full name and section
            • Links to each of the lab assignments
            • Link to the Kanbas application
            • Links to all relevant source code repositories
            The Kanbas application should include a link to navigate back to the landing page.
          </textarea>

          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="wd-points">Points</label>
              <input id="wd-points" type="text" className="form-control" value="100" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
              <div className="input-group">
                <select id="wd-assignment-group" className="form-select">
                  <option>ASSIGNMENTS</option>
                </select>
                <span className="input-group-text"><FaCaretDown /></span>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="wd-grade-display">Display Grade as</label>
              <div className="input-group">
                <select id="wd-grade-display" className="form-select">
                  <option>Percentage</option>
                </select>
                <span className="input-group-text"><FaCaretDown /></span>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="wd-submission-type">Submission Type</label>
              <div className="input-group">
                <select id="wd-submission-type" className="form-select">
                  <option>Online</option>
                </select>
                <span className="input-group-text"><FaCaretDown /></span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <h4>Online Entry Options</h4>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-text-entry" />
              <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-website-url" checked />
              <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
              <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
              <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-file-uploads" />
              <label className="form-check-label" htmlFor="wd-file-uploads">File Uploads</label>
            </div>
          </div>

          <div className="mb-4">
            <h4>Assign</h4>
            <div className="border rounded p-3">
              <div className="mb-3">
                <label htmlFor="wd-assign-to">Assign to</label>
                <div className="d-flex align-items-center">
                  <input id="wd-assign-to" type="text" className="form-control" value="Everyone" readOnly />
                  <FaTimes className="ms-2 text-muted" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="wd-due-date">Due</label>
                <div className="input-group">
                  <input id="wd-due-date" type="text" className="form-control" value="May 13, 2024, 11:59 PM" />
                  <span className="input-group-text"><FaCalendarAlt /></span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="wd-available-from">Available from</label>
                  <div className="input-group">
                    <input id="wd-available-from" type="text" className="form-control" value="May 6, 2024, 12:" />
                    <span className="input-group-text"><FaCalendarAlt /></span>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="wd-until">Until</label>
                  <div className="input-group">
                    <input id="wd-until" type="text" className="form-control" />
                    <span className="input-group-text"><FaCalendarAlt /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button className="btn btn-light me-2">Cancel</button>
            <button className="btn btn-danger">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}