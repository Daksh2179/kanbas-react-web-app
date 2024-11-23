import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./style.css";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";  // userClient is used here
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useSelector } from "react-redux";

export default function Kanbas() {
  // Initialize courses as an empty array
  const [courses, setCourses] = useState<any[]>([]);

  // Default course for adding/editing
  const [course, setCourse] = useState<any>({
    _id: "",
    name: "",
    logo: "",
    number: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Add new course
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };

  // Delete a course
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  // Update a course
  const updateCourse = () => {
    setCourses(
      courses.map((c) => (c._id === course._id ? { ...course } : c))
    );
  };

  // Fetch courses dynamically using findMyCourses from userClient
  const fetchCourses = async () => {
    try {
      const fetchedCourses = await userClient.findMyCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setCourses([]); 
    }
  };

  // Access current user from Redux store
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  return (
    <Session>
      <div className="d-flex" id="wd-kanbas">
        <KanbasNavigation />
        <div className="flex-fill wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kanbas/Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
