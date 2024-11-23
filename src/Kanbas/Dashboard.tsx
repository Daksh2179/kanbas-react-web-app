import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedFacultyRoute from "./Account/ProtectedFacultyRoute";
import { unenroll, enroll } from "./reducer";
import { Course, User, Enrollment } from "./Database"; // Remove if not used

interface DashboardProps {
  courses: any[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

interface RootState {
  accountReducer: {
    currentUser: User;
  };
  enrollmentsReducer: {
    enrollments: Enrollment[];
  };
}

export default function Dashboard({
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer || { currentUser: {} as User });
  
  const { enrollments = [] } = useSelector((state: RootState) => state.enrollmentsReducer || { enrollments: [] });

  const dispatch = useDispatch();

  const [showEnrollments, setShowEnrollments] = useState(true);
  const [courses, setCourses] = useState<any[]>([]); // Initialize an empty array for courses

  useEffect(() => {
    // Fetch courses from the Node.js server
    fetch("/api/users/current/courses")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched courses:", data); // Log courses to verify
        setCourses(data); // Set the fetched courses into state
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  const isUserEnrolledInCourse = (courseId: string): boolean => {
    if (!enrollments || !currentUser) return false;
    return enrollments.some((enrollment) => enrollment.user === currentUser._id && enrollment.course === courseId);
  };

  const handleEnroll = (courseId: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (!currentUser?._id) return;
    dispatch(enroll({ userId: currentUser._id, courseId: courseId }));
  };

  const handleUnenroll = (courseId: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (!currentUser?._id) return;
    dispatch(unenroll({ userId: currentUser._id, courseId: courseId }));
  };

  const handleEditCourse = (courseToEdit: Course) => (event: React.MouseEvent) => {
    event.preventDefault();
    setCourse(courseToEdit);
  };

  const handleDeleteCourse = (courseId: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    deleteCourse(courseId);
  };

  if (!currentUser || !enrollments) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-dashboard">
      <div className="d-flex">
        <h1 id="wd-dashboard-title" className="flex-grow-1">
          Dashboard
        </h1>
        <button onClick={() => setShowEnrollments(!showEnrollments)} className="btn btn-primary">
          {showEnrollments ? "Show All Courses" : "Show My Courses"}
        </button>
      </div>
      <hr />
      <ProtectedFacultyRoute>
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
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <br />
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
          placeholder="Course Name"
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
          placeholder="Course Description"
        />
        <hr />
      </ProtectedFacultyRoute>
      <h2 id="wd-dashboard-published" className="ps-4">
        Published Courses ({courses.length})
      </h2>
      <div id="wd-dashboard-courses" className="row ps-4">
        <hr />
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <img src={course.image} alt={course.name} width="100%" height={160} className="object-cover" />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    {isUserEnrolledInCourse(course._id) && (
                      <Link
                        className="wd-dashboard-course-link text-decoration-none text-dark"
                        to={`/Kanbas/Courses/${course._id}/Home`}
                      >
                        <button className="btn btn-primary btn-sm">Go</button>
                      </Link>
                    )}
                    {isUserEnrolledInCourse(course._id) ? (
                      <button
                        onClick={handleUnenroll(course._id)}
                        className="btn btn-danger float-end btn-sm"
                        id="wd-unenroll-course-click"
                      >
                        UnEnroll
                      </button>
                    ) : (
                      <button
                        onClick={handleEnroll(course._id)}
                        className="btn btn-success float-end btn-sm"
                        id="wd-enroll-course-click"
                      >
                        Enroll
                      </button>
                    )}
                    {isUserEnrolledInCourse(course._id) && (
                      <ProtectedFacultyRoute>
                        <button
                          onClick={handleDeleteCourse(course._id)}
                          className="btn btn-danger me-2 float-end btn-sm"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={handleEditCourse(course)}
                          className="btn btn-warning me-2 float-end btn-sm"
                        >
                          Edit
                        </button>
                      </ProtectedFacultyRoute>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available.</p> // Display this message if no courses are found
          )}
        </div>
      </div>
    </div>
  );
}
