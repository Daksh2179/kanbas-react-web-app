import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createAssignment, updateAssignment } from './reducer';

function AssignmentEditor() {
  const { aid, cid } = useParams();
  const navigate = useNavigate();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const foundAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState(
    foundAssignment
      ? foundAssignment
      : {
          title: "",
          course: cid,
          description: "",
          points: 0,
          "due-date": "",
          "available-from": "",
          "available-until": "",
        }
  );

  const onSave = () => {
      if (aid === "create") {
        dispatch(createAssignment(assignment));
      } else {
        dispatch(updateAssignment(assignment));
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
  
  };

  if (!assignment && aid !== "create") return <div>Assignment Not Found</div>;
  return (
    <div id="wd-assignments-editor" className="container">
      <label htmlFor="wd-name">Assignment Name</label>
      <input
        required
        id="wd-name"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        className="form-control mt-2"
      />

      <textarea
        required
        id="wd-description"
        cols={60}
        rows={5}
        className="form-control mt-4"
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      >
        {assignment.description}
      </textarea>
      <br />

      <div className="mb-3 row">
        <label htmlFor="email1" className="col-sm-2 col-form-label text-end">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="email1"
            value="email@example.com"
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-points" className="col-sm-2 col-form-label text-end">
          Points
        </label>
        <div className="col-sm-10">
          <input
            required
            id="wd-points"
            value={assignment.points}
            className="form-control"
            onChange={(e) =>
              setAssignment({ ...assignment, points: e.target.value })
            }
          />
        </div>
      </div>

      
      <div className="form-group">
        <label htmlFor="wd-points">Points</label>
        <input id="wd-points" value="100" className="form-control" />
      </div>
      <br/>
      <div className="form-group">
        <label htmlFor="wd-group">Assignment Group</label>
        <select id="wd-group" className="form-control">
          <option>ASSIGNMENTS</option>
          <option>QUIZZES</option>
          <option>EXAMS</option>
          <option>PROJECTS</option>
        </select>
      </div>
      <br/>
      <div className="form-group">
        <label htmlFor="wd-display-grade-as">Display Grade as</label>
        <select id="wd-display-grade-as" className="form-control">
          <option>Percentage</option>
          <option>Pts</option>
          <option>Grades</option>
        </select>
      </div>
      <br/>
      <div className="form-group">
        <label>Submission Type</label>
        <div className="assign-content">
        <select className="form-control">
          <option>Online</option>
          <option>In-Person</option>
        </select><br/>
        <div >
        <div className="assign-to">
          <p >Online Entry Options</p>
          </div>
          <div className="checkbox">
            <label><input type="checkbox" /> Text Entry</label>
          </div>
          <div className="checkbox">
            <label><input type="checkbox" checked /> Website URL</label>
          </div>
          <div className="checkbox">
            <label><input type="checkbox" /> Media Recordings</label>
          </div>
          <div className="checkbox">
            <label><input type="checkbox" /> Student Annotation</label>
          </div>
          <div className="checkbox">
            <label><input type="checkbox" /> File Uploads</label>
          </div>
        </div>
      </div>
      </div>
      <br/>
      
        <label>Assign</label>
        <div className="assign-content">
          <div className="assign-to">
            <p>Assign to</p>
            <div className="form-group">
        <select id="wd-group" className="form-control">
          <option>Everyone</option>
          <option>Individual</option>
        </select>
      </div>
      <br/> 
          </div>
          <div className="due-date">
            <p>Due</p>
            <div className="date-input">
              <input type="text" value="June 12, 2024, 11:59 PM" className="form-control" />
              <FaCalendarAlt className="calendar-icon" />
            </div>
          </div>
          <div className="availability">
            <div className="available-from">
              <p>Available from</p>
              <div className="date-input">
                <input type="text" value="June 8, 2024, 12:00 AM" className="form-control" />
                <FaCalendarAlt className="calendar-icon" />
              </div>
            </div>
            <div className="until">
              <p>Until</p>
              <div className="date-input">
                <input type="text" value="June 13, 2024, 12:00 AM" className="form-control" />
                <FaCalendarAlt className="calendar-icon" />
              </div>
            </div>
          </div>
          
        </div>
        <br/>
        <div className="button-group">
        <div className="float-end">
        <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
          <button
            id="wd-cancel-btn"
            type="button"
            className="btn btn-light border border-gray me-3"
          >
            Cancel
          </button>
        </Link>
          <button
            id="wd-save-btn"
            type="button"
            className="btn btn-danger px-4"
            onClick={()=>onSave()}
          >
            Save
          </button>
      </div>
    </div>
      </div>
   
      
      
     
  );
}

export default AssignmentEditor;