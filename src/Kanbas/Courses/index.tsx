import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa6";
import Navigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { Course } from "../Database/index";

interface CoursesProps {
  courses: Course[];
}

interface CourseContentProps {
  courseName: string;
  contentType: string;
}

const CourseContent: React.FC<CourseContentProps> = ({ courseName, contentType }) => (
  <div>{contentType} Content for {courseName}</div>
);

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  const { cid } = useParams<{ cid: string }>();
  const course = courses.find((course) => course._id === cid);

  if (!course) {
    return (
      <div className="alert alert-danger" role="alert">
        Course not found
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Navigation selectedCourse={course} />
      <div className="content-area">
        <div className="p-4">
          <h1 className="mb-4">
            <FaAlignJustify className="me-2" aria-hidden="true" />
            {course.name}
          </h1>
          <hr />
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home course={course} />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route 
              path="Piazza" 
              element={<CourseContent courseName={course.name} contentType="Piazza" />} 
            />
            <Route 
              path="Zoom" 
              element={<CourseContent courseName={course.name} contentType="Zoom" />} 
            />
            <Route 
              path="Assignments/:aid" 
              element={<AssignmentEditor />} 
            />
            <Route 
              path="Quizzes" 
              element={<CourseContent courseName={course.name} contentType="Quizzes" />} 
            />
            <Route 
              path="Grades" 
              element={<CourseContent courseName={course.name} contentType="Grades" />} 
            />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Courses;