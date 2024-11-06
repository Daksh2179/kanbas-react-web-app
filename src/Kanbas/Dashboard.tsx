import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { enrollment } from "./Database";

interface DashboardProps {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Filter courses based on the current user's enrollments
  const userCourses = courses.filter((course) =>
    enrollment.some(
      (enrollmentRecord) =>
        enrollmentRecord.user === currentUser._id &&
        enrollmentRecord.course === course._id
    )
  );

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Only render course form and buttons if the user has the FACULTY role */}
      {currentUser.role === "FACULTY" && (
        <>
          {/* Course Form */}
          <h5>
            Course Form
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
          <div className="mb-4">
            <input
              value={course.name}
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              placeholder="Course Name"
            />
            <input
              value={course.number}
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, number: e.target.value })}
              placeholder="Course Number"
            />
            <textarea
              value={course.description}
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              placeholder="Course Description"
            />
          </div>
          <hr />
        </>
      )}

      {/* Published Courses */}
      <h2 id="wd-dashboard-published">Published Courses ({userCourses.length})</h2>
      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {userCourses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src={`/images/${course.image || "default.jpg"}`}
                    width="100%"
                    height={160}
                    alt={course.name}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button className="btn btn-primary">Go</button>
                      {currentUser.role === "FACULTY" && (
                        <div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2"
                            id="wd-edit-course-click"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
