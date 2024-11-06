import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Course, Enrollment, User } from '../Database';
import { enroll, unenroll } from './enrollmentActions';

interface EnrollmentsTableProps {
  courses: Course[];
  currentUser: User;
}

const EnrollmentsTable: React.FC<EnrollmentsTableProps> = ({ courses, currentUser }) => {
  const dispatch = useDispatch();
  const enrollments = useSelector((state: any) => state.enrollment.enrollments);

  const handleEnroll = (course: Course) => {
    dispatch(enroll(currentUser._id, course._id));
  };

  const handleUnenroll = (course: Course) => {
    dispatch(unenroll(currentUser._id, course._id));
  };

  return (
    <div className="enrollments-table">
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.number}</td>
              <td>
                {enrollments.some((e: Enrollment) => e.course === course._id && e.user === currentUser._id) ? (
                  <button className="btn btn-danger" onClick={() => handleUnenroll(course)}>
                    Unenroll
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={() => handleEnroll(course)}>
                    Enroll
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentsTable;