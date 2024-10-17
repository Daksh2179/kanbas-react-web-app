import React from 'react';
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../Database";
import Navigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from './Assignments/Editor';
import PeopleTable from './People/Table';

const Courses: React.FC = () => {
  const { cid } = useParams<{ cid: string }>();
  const course = courses.find((course) => course._id === cid);

  if (!course) {
    return <div className="alert alert-danger">Course not found</div>;
  }

  return (
    <div className="d-flex">
      <Navigation selectedCourse={course} />
      <div className="content-area">
        <div className="p-4">
          <h1 className="mb-4">
            <FaAlignJustify className="me-2" />
            {course.name}
          </h1>
          <hr />
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home course={course} />} />
            <Route path="Modules" element={<Modules course={course} />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Piazza" element={<div>Piazza Content for {course.name}</div>} />
            <Route path="Zoom" element={<div>Zoom Content for {course.name}</div>} />
            <Route path="/Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<div>Quizzes Content for {course.name}</div>} />
            <Route path="Grades" element={<div>Grades Content for {course.name}</div>} />
            <Route path="People" element={<PeopleTable course={course} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;
