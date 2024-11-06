import React, { useMemo } from 'react';
import { useParams } from "react-router";
import { LuFileEdit } from "react-icons/lu";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaTrash } from 'react-icons/fa';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeAssignment } from './reducer';
import { BiSearch } from "react-icons/bi";
import GreenCheckmark from '../Modules/GreenCheckmark';
import { Assignment } from '../../Database/index';

function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: { assignmentsReducer: { assignments: Assignment[] } }) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: { role: string } } }) => state.accountReducer);

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => assignment.course === cid);
  }, [assignments, cid]);

  return (
    <div id="wd-assignments" className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group me-2 w-50">
          <span className="input-group-text">
            <BiSearch />
          </span>
          <input
            id="wd-search-assignment"
            className="form-control"
            placeholder="Search for Assignments"
          />
        </div>
        <div className="d-flex">
          <button
            id="wd-add-assignment-group"
            className="btn btn-secondary me-2"
          >
            + Group
          </button>
          {currentUser?.role === "FACULTY" && (
            <Link
              id="wd-add-assignment"
              className="btn btn-danger"
              to={`/Kanbas/Courses/${cid}/Assignments/create`}
            >
              + Assignment
            </Link>
          )}
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between bg-secondary p-3 ps-1 border border-dark">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <h3 id="wd-assignments-title" className="fs-4 m-0">
            ASSIGNMENTS
          </h3>
        </div>

        <div className="d-flex align-items-center">
          <button className="btn btn-secondary rounded-pill border border-dark me-2">
            40% of Total
          </button>
          <button className="border-0 me-2 bg-transparent">
            <FaPlus className="fs-4" />
          </button>
          <button className="border-0 bg-transparent">
            <IoEllipsisVertical aria-label="More options" className="fs-4" />
          </button>
        </div>
      </div>

      <ul id="wd-assignment-list" className="list-group rounded-0">
        {filteredAssignments.map((assignment) => (
          <li
            key={assignment.id}
            className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <LuFileEdit className="me-2 fs-3 text-success" />
              <div>
                {currentUser.role === "FACULTY" ? (
                  <a
                    className="wd-assignment-link"
                    href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment.id}`}
                  >
                    {`${assignment.id} - ${assignment.name}`}
                  </a>
                ) : (
                  <span className="wd-assignment-link">
                    {`${assignment.id} - ${assignment.name}`}
                  </span>
                )}
                <br />
                Multiple Modules | <b>Not available</b> until{" "}
                {assignment.availableFrom} at 12:00am | <b>Due</b>{" "}
                {assignment.dueDate} at 11:59pm | {assignment.points} pts
              </div>
            </div>
            <div className="float-end d-flex align-items-center">
              {currentUser.role === "FACULTY" && (
                <FaTrash
                  className="text-danger me-2 mb-1"
                  onClick={() => dispatch(removeAssignment(assignment.id))}
                />
              )}
              <GreenCheckmark />
              <IoEllipsisVertical aria-label="More options" className="fs-4" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assignments;