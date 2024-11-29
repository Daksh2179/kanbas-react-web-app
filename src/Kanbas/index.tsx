import { Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./style.css";

import ProtectedRoute from "./Account/ProtectedRoute";
import store from "./store";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { 
  setCurrentUser, 
  clearCurrentUser 
} from "./Account/reducer";

export default function Kanbas() {
  const dispatch = useDispatch();
  
  // enrolled courses
  const [courses, setCourses] = useState<any[]>([]);
  // all courses
  const [allCourses, setAllCourses] = useState<any[]>([]);
  // enrollments
  const [enrollments, setEnrollments] = useState<any[]>([]);
  // dummy body: course
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    logo: "/images/reactLogo.png",
    description: "New Description",
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Fetch enrollments
  const fetchEnrollments = async () => {
    try {
      const fetchedEnrollments = await courseClient.getEnrollments();
      setEnrollments(fetchedEnrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
    setAllCourses([...allCourses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    setAllCourses(allCourses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => (c._id === course._id ? course : c))
    );
    setAllCourses(
      allCourses.map((c) => (c._id === course._id ? course : c))
    );
  };

  const getAllCourses = async () => {
    try {
      const fetchedCourses = await courseClient.fetchAllCourses();
      setAllCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      // Only fetch enrolled courses if there's a current user
      if (currentUser) {
        // Fetch both enrolled courses and enrollments
        const [enrolledCourses, fetchedEnrollments] = await Promise.all([
          userClient.findCoursesByEnrolledUser(),
          courseClient.getEnrollments()
        ]);
        
        setCourses(enrolledCourses);
        setEnrollments(fetchedEnrollments);
      } else {
        setCourses([]);
        setEnrollments([]);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setCourses([]);
      setEnrollments([]);
    }
  };

  // Fetch courses and update current user when currentUser changes
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await userClient.profile();
        dispatch(setCurrentUser(user));
      } catch (error) {
        dispatch(clearCurrentUser());
      }
    };

    checkCurrentUser();
    fetchCourses();
    getAllCourses();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kanbas">
          <KanbasNavigation />
          <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
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
                      allCourses={allCourses}
                      enrollments={enrollments}
                      fetchCourses={fetchCourses}
                      fetchAllCourses={() => getAllCourses()}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Courses/:cid/*"
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
    </Provider>
  );
}