import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { enroll, unenroll } from "./Courses/Home/reducer";
// import * as coursesClient from "./Courses/client";

function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  // const dispatch = useDispatch();

  const isEnrolled = (course: any) => {
    if (currentUser.role === "STUDENT") {
      if (!enrolling) return true;
      return course.enrolled;
    } else {
      return true;
    }
    // return enrollments.some(
    //   (enrollment: any) =>
    //     enrollment.user === currentUser._id && enrollment.course === course._id
    // );
  };

  // const unenrollCourse = async (courseId: string) => {
  //   console.log("unenroll", courseId);

  //   await coursesClient.unenrollUserFromCourse(courseId);
  //   dispatch(
  //     unenroll({
  //       user: currentUser._id,
  //       course: courseId,
  //     })
  //   );
  // };

  // const enrollCourse = async (courseId: string) => {
  //   console.log("Enroll", courseId);
  //   await coursesClient.enrollUserInCourse(courseId);
  //   dispatch(
  //     enroll({
  //       user: currentUser._id,
  //       course: courseId,
  //     })
  //   );
  // };

  console.log(courses);

  return (
    <div id="wd-dashboard">
      {currentUser.role === "STUDENT" && (
        <div className="d-flex align-items-center justify-content-between">
          <h1 id="wd-dashboard-title">Dashboard</h1>
          <button
            onClick={() => setEnrolling(!enrolling)}
            className="float-end btn btn-primary"
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        </div>
      )}
      <hr />
      {currentUser.role === "FACULTY" && (
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
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
       </button>
      </h2>
      
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={
                    isEnrolled(course)
                      ? `/Kanbas/Courses/${course._id}/Home`
                      : `/Kanbas/Dashboard`
                  }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src="/images/reactjs.webp"
                    width="100%"
                    height={160}
                    alt={course.name}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {enrolling && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                          }}
                          className={`btn ${
                            course.enrolled ? "btn-danger" : "btn-success"
                          } float-end`}
                        >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <button className="btn btn-primary"> Go </button>

                    {currentUser.role === "FACULTY" && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>

                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                    {/* {currentUser.role === "STUDENT" &&
                      (isEnrolled(course) ? (
                        <button
                          className="btn btn-danger float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            unenrollCourse(course._id);
                          }}
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          className="btn btn-success float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            enrollCourse(course._id);
                          }}
                        >
                          Enroll
                        </button>
                      ))} */}
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

export default Dashboard;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// export default function Dashboard(
//   { courses, course, setCourse, addNewCourse,
//     deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
//       courses: any[]; course: any; setCourse: (course: any) => void;
//       addNewCourse: () => void; deleteCourse: (course: any) => void;
//       updateCourse: () => void;
//       enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
//       updateEnrollment: (courseId: string, enrolled: boolean) => void;
//     }
// ) {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title" className="text-danger">
//         Dashboard
//       </h1> <hr />

//       {currentUser.role === "FACULTY" && (
//         <>
//           <h5>New Course
//             <button className="btn btn-primary float-end"
//               id="wd-add-new-course-click"
//               onClick={addNewCourse} > Add </button>
//             <button className="btn btn-warning float-end me-2"
//               onClick={updateCourse} id="wd-update-course-click">
//               Update
//             </button>
//           </h5><hr /><br />
//           <input value={course.name} className="form-control mb-2"
//             onChange={(e) => setCourse({ ...course, name: e.target.value })} />
//           <textarea value={course.description} className="form-control"
//             onChange={(e) => setCourse({ ...course, description: e.target.value })} /><br />
//         </>
//       )}

//       <h2 id="wd-dashboard-published">
//         Published Courses ({courses.length})
//         <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
//           {enrolling ? "My Courses" : "All Courses"}
//         </button>
//       </h2> <hr />

//       <div id="wd-dashboard-courses" className="row">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {courses.map((course) => (
//             <div className="wd-dashboard-course col" style={{ width: "300px" }}>
//               <div className="card rounded-3 overflow-hidden">

//                 <img
//                   src={course.image ? `/images/${course.image}` : '/images/placeholder.png'}
//                   alt={course.name || 'Course Image'}
//                   width="100%"
//                   height={160}
//                 />
//                 <div className="card-body">
//                   <h5 className="wd-dashboard-course-title card-title">
//                     {enrolling && (
//                       <button onClick={(event) => {
//                         event.preventDefault();
//                         updateEnrollment(course._id, !course.enrolled);
//                       }}
//                         className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
//                         {course.enrolled ? "Unenroll" : "Enroll"}
//                       </button>
//                     )}
//                     {course.name} </h5>
//                   <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
//                     {course.description} </p>

//                   {currentUser.role === "FACULTY" && (
//                     <>
//                       <Link to={`/Kanbas/Courses/${course._id}/Home`}
//                         className="wd-dashboard-course-link text-decoration-none text-dark" >
//                         <button className="btn btn-primary"> Go </button>
//                       </Link>
//                       <button onClick={(event) => {
//                         event.preventDefault();
//                         deleteCourse(course._id);
//                       }} className="btn btn-danger float-end"
//                         id="wd-delete-course-click">
//                         Delete
//                       </button>

//                       <button id="wd-edit-course-click"
//                         onClick={(event) => {
//                           event.preventDefault();
//                           setCourse(course);
//                         }}
//                         className="btn btn-warning me-2 float-end" >
//                         Edit
//                       </button>
//                     </>
//                   )}

//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }