import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { UserRole } from "./roles";
import * as courseClient from "./Courses/client";
import "./style.css";
import { Link } from "react-router-dom";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  allCourses,
  enrollments,
  fetchCourses,
  fetchAllCourses,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  allCourses: any[];
  enrollments: any[];
  fetchCourses: () => void;
  fetchAllCourses: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer) || {};
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [userEnrolledCourses, setUserEnrolledCourses] = useState<any[]>([]);

  // Fetch enrolled courses when the component mounts or user changes
  useEffect(() => {
    if (currentUser?._id) {
      const fetchUserCourses = async () => {
        try {
          const courses = await courseClient.findCoursesByEnrolledUser(currentUser._id);
          setUserEnrolledCourses(courses);
        } catch (error) {
          console.error("Error fetching enrolled courses:", error);
        }
      };
      fetchUserCourses();
    }
  }, [currentUser]);

  // Check if the user is enrolled in a course
  const isEnrolled = (courseId: string) =>
    userEnrolledCourses.some((course) => course._id === courseId);

  // Toggle between all courses and only enrolled courses
  const toggleEnrollments = () => {
    setShowAllCourses(!showAllCourses);
  };

  // Enroll user in a course
  const enrollUserInCourse = async (courseId: string) => {
    try {
      await courseClient.enroll(currentUser._id, courseId);
      await fetchCourses();
      await fetchAllCourses();
    } catch (error) {
      console.error("Error enrolling user:", error);
    }
  };

  // Unenroll user from a course
  const unEnrollUserFromCourse = async (courseId: string) => {
    try {
      await courseClient.unEnroll(currentUser._id, courseId);
      await fetchCourses();
      await fetchAllCourses();
    } catch (error) {
      console.error("Error unenrolling user:", error);
    }
  };

  // Display courses (either all or just enrolled)
  const displayedCourses = showAllCourses ? allCourses : userEnrolledCourses;

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <button
          className="btn btn-primary"
          id="wd-enrollments-button"
          onClick={toggleEnrollments}
        >
          {showAllCourses ? "My Enrollments" : "All Courses"}
        </button>
      </div>
      <hr />

      {currentUser?.role === UserRole.FACULTY && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={updateCourse}
            >
              Update
            </button>
          </h5>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            placeholder="Course Description"
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Enrolled Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row g-3">
        {displayedCourses.map((course) => (
          <div key={course._id} className="col-md-4 d-flex">
            <div className="card mb-3 w-100">
              <Link
                to={isEnrolled(course._id) ? `/Kanbas/Courses/${course._id}/Home` : "#"}
                className="text-decoration-none text-dark"
              >
                <img
                  src={course.image}
                  alt="Course"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.name || "Unnamed Course"}</h5>
                  <p className="card-text">
                    {course.description || "No description available"}
                  </p>
                  {isEnrolled(course._id) && <button className="btn btn-primary">Go</button>}
                </div>
              </Link>
              <div className="card-footer">
                {isEnrolled(course._id) ? (
                  <button
                    onClick={() => unEnrollUserFromCourse(course._id)}
                    className="btn btn-danger float-end"
                  >
                    Unenroll
                  </button>
                ) : (
                  <button
                    onClick={() => enrollUserInCourse(course._id)}
                    className="btn btn-success float-end"
                  >
                    Enroll
                  </button>
                )}

                {currentUser?.role === UserRole.FACULTY && isEnrolled(course._id) && (
                  <>
                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="btn btn-danger me-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setCourse(course)}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
