import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const { cid } = useParams();
  const dispatch = useDispatch();

  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments
  );
  const assignment = assignments.find(
    (assignment: any) => assignment._id === aid
  );

  const [title, setTitle] = useState(
    assignment ? assignment.title : "New Assignment"
  );
  const [points, setPoints] = useState(assignment ? assignment.points : 100);
  const [dueDate, setDueDate] = useState(
    assignment ? assignment.dueDate : "2024-05-15"
  );
  const [availableDate, setAvailableDate] = useState(
    assignment ? assignment.availableDate : "2024-05-15"
  );

  const handleSave = () => {
    if (aid) {
      dispatch(
        updateAssignment({
          _id: aid,
          title,
          courseId: cid,
          points,
          dueDate,
          availableDate,
        })
      );
    } else {
      dispatch(
        addAssignment({
          title,
          courseId: cid,
          points,
          dueDate,
          availableDate,
        })
      );
    }
  };

  return (
    <div>
      <div
        id="wd-assignments-editor"
        className="d-flex align-items-center min-vh-100"
      >
        <div className="col-md-9">
          <div className="row mb-1 text-end">
            <label className="col-sm-2 me-3 col-form-label"></label>
            Assignment Name
          </div>
          <div className="row mb-3 text-end">
            <label
              htmlFor="wd-name"
              className="col-sm-2 col-form-label"
            ></label>
            <div className="col-sm-10">
              <input
                id="wd-name"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="wd-description"
              className="col-sm-2 col-form-label"
            ></label>
            <div className="col-sm-10">
              <p id="wd-description" className="form-control">
                The assignment is{" "}
                <span className="text-danger">available online.</span>
                <br />
                <br />
                Submit a link to the landing page to the web application running
                on Netlify.
                <br />
                <br />
                The landing page should include the following:
                <br />
                <ul>
                  <li>Your full name and section</li>
                  <li>Links to each of the lab assignments</li>
                  <li>Link to the Kanbas application</li>
                  <li>Links to all relevant source code repositories</li>
                </ul>
                The Kanbas application should include a link to navigate back to
                the landing page.
              </p>
            </div>
          </div>

          {/* Points and Assignment Group */}
          <div className="row mb-3 text-end">
            <label htmlFor="wd-points" className="col-sm-4 col-form-label">
              Points
            </label>
            <div className="col-sm-8">
              <input
                id="wd-points"
                className="form-control"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3 text-end">
            <label htmlFor="wd-group" className="col-sm-4 col-form-label">
              Assignment Group
            </label>
            <div className="col-sm-8">
              <select id="wd-group" className="form-select">
                <option selected value="Assignments">
                  Assignments
                </option>
                <option value="Quiz">Quiz</option>
                <option value="Tests">Test</option>
              </select>
            </div>
          </div>

          {/* Display Grade and Submission Type */}
          <div className="row mb-3 text-end">
            <label
              htmlFor="wd-display-grade-as"
              className="col-sm-4 col-form-label"
            >
              Display Grade as
            </label>
            <div className="col-sm-8">
              <select id="wd-display-grade-as" className="form-select">
                <option selected value="Percentage">
                  Percentage
                </option>
                <option value="RawScore">Raw Score</option>
                <option value="Class">Class</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="wd-submission-type"
              className="col-sm-4 col-form-label text-end"
            >
              Submission Type
            </label>
            <div className="col pt-2 border rounded-2 me-3 ms-3">
              <select id="wd-submission-type" className="form-select">
                <option selected value="Online">
                  Online
                </option>
                <option value="Offline">Offline</option>
              </select>

              <div className="d-flex justify-content-start m-2 ms-1 fw-bold">
                Online Entry Options
              </div>

              <div className="col-sm-8 ms-1">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="wd-text-entry"
                    className="form-check-input"
                  />
                  <label
                    htmlFor="wd-text-entry"
                    className="form-check-label ms-2"
                  >
                    Text Entry
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="wd-website-url"
                    className="form-check-input"
                    defaultChecked
                  />
                  <label
                    htmlFor="wd-website-url"
                    className="form-check-label ms-2"
                  >
                    Website URL
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="wd-media-recordings"
                    className="form-check-input"
                  />
                  <label
                    htmlFor="wd-media-recordings"
                    className="form-check-label ms-2"
                  >
                    Media Recordings
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="wd-student-annotation"
                    className="form-check-input"
                  />
                  <label
                    htmlFor="wd-student-annotation"
                    className="form-check-label ms-2"
                  >
                    Student Annotation
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="wd-file-upload"
                    className="form-check-input"
                  />
                  <label
                    htmlFor="wd-file-upload"
                    className="form-check-label ms-2"
                  >
                    File Uploads
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Assign to and Due Date */}
          <div className="row mb-3">
            <label
              htmlFor="wd-assign-to"
              className="col-sm-4 col-form-label text-end"
            >
              Assign
            </label>
            <div className="col pt-2 border rounded-2 me-3 ms-3">
              <label
                htmlFor="wd-assign-to"
                className="col-form-label m-2 ms-1 mb-0 fw-bold"
              >
                Assign to
              </label>
              <input
                id="wd-assign-to"
                className="form-select"
                value="Everyone"
              />

              <label
                htmlFor="wd-due-date"
                className="col-form-label m-2 ms-1 mb-0 fw-bold"
              >
                Due
              </label>
              <input
                type="date"
                id="wd-due-date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <div className="row mb-3">
                <div className="col-sm-6">
                  <label
                    htmlFor="wd-available-from"
                    className="col-form-label m-2 ms-1 mb-0 fw-bold"
                  >
                    Available From
                  </label>
                  <input
                    type="date"
                    id="wd-available-from"
                    className="form-control"
                    defaultValue={availableDate}
                    onChange={(e) => setAvailableDate(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <label
                    htmlFor="wd-available-to"
                    className="col-form-label m-2 ms-1 mb-0 fw-bold"
                  >
                    {" "}
                    Until
                  </label>
                  <input
                    type="date"
                    id="wd-available-to"
                    className="form-control"
                    defaultValue="2024-09-21"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />

          {/* Save and Cancel Buttons */}
          <div className="d-flex justify-content-end mt-3">
            <Link
              to={`/Kanbas/Courses/${cid}/Assignments`}
              className="btn btn-light me-2"
              id="wd-course-assignment-link"
            >
              Cancel
            </Link>
            <Link
              to={`/Kanbas/Courses/${cid}/Assignments`}
              className="btn btn-success btn-danger"
              id="wd-course-assignment-link"
              onClick={handleSave}
            >
              Save
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}