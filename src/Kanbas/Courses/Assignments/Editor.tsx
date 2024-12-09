import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

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

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = { ...assignment, course: cid };
    const assignmentRes = await coursesClient.createAssignmentForCourse(
      cid,
      newAssignment
    );
    dispatch(addAssignment(assignmentRes));
  };

  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const onSaveClick = () => {
    if (
      assignment.title &&
      assignment.description &&
      assignment.points &&
      assignment["due-date"] &&
      assignment["available-from"] &&
      assignment["available-until"]
    ) {
      if (aid === "new") {
        createAssignmentForCourse();
      } else {
        saveAssignment(assignment);
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } else {
      alert("Fill in all the values");
    }
  };

  if (!assignment && aid !== "new") return <div>Assignment Not Found</div>;
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

      {/* Complete on your own */}
      <div className="mb-3 row">
        <label htmlFor="wd-group" className="col-sm-2 col-form-label text-end">
          Assignment Group
        </label>
        <div className="col-sm-10">
          <select id="wd-group" className="form-select">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECTS">PROJECTS</option>
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label
          htmlFor="wd-display-grade-as"
          className="col-sm-2 col-form-label text-end"
        >
          Display Grade As
        </label>
        <div className="col-sm-10">
          <select id="wd-display-grade-as" className="form-select">
            <option value="PERCENTAGE">Percentage</option>
            <option value="MARKS">Marks</option>
            <option value="GRADE">Grade</option>
          </select>
        </div>
      </div>

      {/* SUBMISSION TYPE */}
      <div className="mb-3 row">
        <label
          htmlFor="wd-submission-type"
          className="col-sm-2 col-form-label text-end"
        >
          Submission Type
        </label>
        <div className="col-sm-10">
          <div className="border border-gray p-3">
            <select id="wd-submission-type" className="form-select">
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </select>

            <label className="py-3 fw-semibold">Online Entry Options</label>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                name="check-entry-options"
                id="wd-text-entry"
                className="form-check-input"
              />
              <label htmlFor="wd-text-entry" className="form-check-label">
                Text Entry
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                name="check-entry-options"
                id="wd-website-url"
                className="form-check-input"
              />
              <label htmlFor="wd-website-url" className="form-check-label">
                Website URL
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                name="check-entry-options"
                id="wd-media-recordings"
                className="form-check-input"
              />
              <label htmlFor="wd-media-recordings" className="form-check-label">
                Media Recordings
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                name="check-entry-options"
                id="wd-student-annotation"
                className="form-check-input"
              />
              <label
                htmlFor="wd-student-annotation"
                className="form-check-label"
              >
                Student Annotation
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                name="check-entry-options"
                id="wd-file-upload"
                className="form-check-input"
              />
              <label htmlFor="wd-file-upload" className="form-check-label">
                File Uploads
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ASSIGN */}
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label text-end">Assign</label>
        <div className="col-sm-10">
          <div className="border border-gray p-3">
            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="form-label fw-semibold">
                Assign to
              </label>
              <select id="wd-assign-to" className="form-select">
                <option value="EVERYONE">Everyone</option>
                <option value="INDIVIDUAL">Individual</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label fw-semibold">
                Due
              </label>
              <input
                required
                type="date"
                id="wd-due-date"
                value={assignment["due-date"]}
                className="form-control"
                onChange={(e) =>
                  setAssignment({ ...assignment, "due-date": e.target.value })
                }
              />
            </div>

            <div className="d-flex">
              <div className="me-3">
                <label
                  htmlFor="wd-available-from"
                  className="form-label fw-semibold"
                >
                  Available from
                </label>
                <input
                  required
                  type="date"
                  id="wd-available-from"
                  value={assignment["available-from"]}
                  className="form-control"
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      "available-from": e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="wd-available-until"
                  className="form-label fw-semibold"
                >
                  Until
                </label>
                <input
                  required
                  type="date"
                  id="wd-available-until"
                  value={assignment["available-until"]}
                  className="form-control"
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      "available-until": e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

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
          onClick={() => onSaveClick()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AssignmentEditor;