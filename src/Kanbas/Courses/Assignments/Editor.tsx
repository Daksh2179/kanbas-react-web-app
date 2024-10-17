import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaCaretDown, FaTimes } from 'react-icons/fa';
import './style.css';

// Define the Assignment type
interface Assignment {
  name: string;
  description: string;
  points: number;
  group: string;
  gradeDisplay: string;
  submissionType: string;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
}

// Define the assignments data structure
const assignmentsData: Record<string, Assignment> = {
  '123': {
    name: 'A1',
    description: `The assignment is available online. 
    Submit a link to the landing page of your Web application running on Netlify. 
    The landing page should include the following: 
    - Your full name and section 
    - Links to each of the lab assignments 
    - Link to the Kanbas application 
    - Links to all relevant source code repositories 
    - The Kanbas application should include a link to navigate back to the landing page.`,
    points: 100,
    group: 'ASSIGNMENTS',
    gradeDisplay: 'Percentage',
    submissionType: 'Online',
    dueDate: 'May 13, 2024, 11:59 PM',
    availableFrom: 'May 6, 2024, 12:00 AM',
    availableUntil: 'May 13, 2024, 11:59 PM',
  },
  '124': {
    name: 'A2',
    description: `For this assignment, create a fully functional Kanban board. 
    It should include the following features: 
    - Add, edit, and delete tasks 
    - Drag and drop functionality 
    - Save the state of the board using local storage.`,
    points: 100,
    group: 'ASSIGNMENTS',
    gradeDisplay: 'Percentage',
    submissionType: 'Online',
    dueDate: 'May 20, 2024, 11:59 PM',
    availableFrom: 'May 13, 2024, 12:00 AM',
    availableUntil: 'May 20, 2024, 11:59 PM',
  },
  '125': {
    name: 'A3',
    description: `This assignment requires you to deploy your Kanban board application 
    on Netlify. Make sure to include the following: 
    - Your application must be accessible publicly 
    - Ensure that all functionality is working after deployment.`,
    points: 100,
    group: 'ASSIGNMENTS',
    gradeDisplay: 'Percentage',
    submissionType: 'Online',
    dueDate: 'May 27, 2024, 11:59 PM',
    availableFrom: 'May 20, 2024, 12:00 AM',
    availableUntil: 'May 27, 2024, 11:59 PM',
  },
};

export default function AssignmentEditor() {
  const { courseId, aid } = useParams<{ courseId: string, aid: string }>();
  const assignment = aid ? assignmentsData[aid] : undefined;

  if (!assignment) {
    return <div>Assignment not found.</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <h2 className="mb-4">CS5610 SU1 24 MON/FRI {'>'} Assignments {'>'} {assignment.name}</h2>
      <div className="row">
        <div className="col-md-8">
          <h3 className="text-danger mb-4">Assignment Name</h3>
          <input id="wd-name" className="form-control mb-3" defaultValue={assignment.name} />
          <textarea id="wd-description" className="form-control mb-3" rows={6} defaultValue={assignment.description} />

          {/* Points */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="wd-points">Points</label>
              <input id="wd-points" type="text" className="form-control" defaultValue={assignment.points} />
            </div>
          </div>

          {/* Assignment Group */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
              <div className="input-group">
                <select id="wd-assignment-group" className="form-select" defaultValue={assignment.group}>
                  <option>{assignment.group}</option>
                </select>
                <span className="input-group-text"><FaCaretDown /></span>
              </div>
            </div>
          </div>

          {/* Display Grade as */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="wd-grade-display">Display Grade as</label>
              <div className="input-group">
                <select id="wd-grade-display" className="form-select" defaultValue={assignment.gradeDisplay}>
                  <option>{assignment.gradeDisplay}</option>
                </select>
                <span className="input-group-text"><FaCaretDown /></span>
              </div>
            </div>
          </div>

          {/* Submission Type */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="wd-submission-type">Submission Type</label>
              <div className="input-group">
                <select id="wd-submission-type" className="form-select" defaultValue={assignment.submissionType}>
                  <option>{assignment.submissionType}</option>
                </select>
                <span className="input-group-text"><FaCaretDown /></span>
              </div>
            </div>
          </div>

          {/* Online Entry Options */}
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

          {/* Assign */}
          <div className="mb-4">
            <h4>Assign</h4>
            <div className="border rounded p-3">
              <div className="mb-3">
                <label htmlFor="wd-assign-to">Assign to</label>
                <div className="d-flex align-items-center">
                  <input id="wd-assign-to" type="text" className="form-control" defaultValue="Everyone" readOnly />
                  <FaTimes className="ms-2 text-muted" />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="wd-due-date">Due</label>
                <div className="input-group">
                  <input id="wd-due-date" type="text" className="form-control" defaultValue={assignment.dueDate} />
                  <span className="input-group-text"><FaCalendarAlt /></span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="wd-available-from">Available from</label>
                  <div className="input-group">
                    <input id="wd-available-from" type="text" className="form-control" defaultValue={assignment.availableFrom} />
                    <span className="input-group-text"><FaCalendarAlt /></span>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="wd-until">Until</label>
                  <div className="input-group">
                    <input id="wd-until" type="text" className="form-control" defaultValue={assignment.availableUntil} />
                    <span className="input-group-text"><FaCalendarAlt /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cancel and Save buttons */}
          <div className="mt-4">
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-light me-2">Cancel</Link>
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-danger">Save</Link>
          </div>
        </div>
      </div>
    </div>
  );
}