import axios from "axios";
import { USERS_API } from "../Account/client";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const fetchAllCourses = async () => {
  try {
    const { data } = await axios.get(COURSES_API);
    return data; // Return the data received from the API
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; // Rethrow error to be handled elsewhere, or return a default value if needed
  }
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};


export const enroll = async (userId: any, courseId: string) => {
  const response = await axios.post(
    `${ENROLLMENTS_API}/enroll/${courseId}/${userId}`);
  return response.data;
};


export const unEnroll = async (userId: any, courseId: string) => {
  const response = await axios.delete(
    `${ENROLLMENTS_API}/unenroll/${courseId}/${userId}`);
  return response.data;
};

export const getEnrollments = async () => {
  const response = await axios.get(`${ENROLLMENTS_API}`);
  return response.data;
};

export const createAssignmentsForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const findCoursesByEnrolledUser = async (userId: string = 'current') => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return []; // Return an empty array if there's an error
  }
};