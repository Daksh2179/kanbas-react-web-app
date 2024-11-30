import axios from "axios";
import { USERS_API } from "../Account/client";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

const axiosWithCredentials = axios.create({ withCredentials: true });

// Define interfaces for better type safety
interface Course {
  _id: string;
  [key: string]: any;
}

interface Module {
  _id?: string;
  [key: string]: any;
}

interface Assignment {
  _id?: string;
  [key: string]: any;
}

export const fetchAllCourses = async (): Promise<Course[]> => {
  try {
    const { data } = await axios.get(COURSES_API);
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const deleteCourse = async (id: string): Promise<Course> => {
  try {
    const { data } = await axios.delete(`${COURSES_API}/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting course ${id}:`, error);
    throw error;
  }
};

export const updateCourse = async (course: Course): Promise<Course> => {
  try {
    const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
    return data;
  } catch (error) {
    console.error(`Error updating course ${course._id}:`, error);
    throw error;
  }
};

export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching modules for course ${courseId}:`, error);
    return [];
  }
};

export const createModuleForCourse = async (courseId: string, module: Module): Promise<Module> => {
  try {
    const response = await axios.post(`${COURSES_API}/${courseId}/modules`, module);
    return response.data;
  } catch (error) {
    console.error(`Error creating module for course ${courseId}:`, error);
    throw error;
  }
};

export const enroll = async (userId: string, courseId: string): Promise<any> => {
  try {
    const response = await axios.post(`${ENROLLMENTS_API}/enroll/${courseId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error enrolling user ${userId} in course ${courseId}:`, error);
    throw error;
  }
};

export const unEnroll = async (userId: string, courseId: string): Promise<any> => {
  try {
    const response = await axios.delete(`${ENROLLMENTS_API}/unenroll/${courseId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error unenrolling user ${userId} from course ${courseId}:`, error);
    throw error;
  }
};

export const getEnrollments = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${ENROLLMENTS_API}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return [];
  }
};

export const createAssignmentsForCourse = async (courseId: string, assignment: Assignment): Promise<Assignment> => {
  try {
    const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return response.data;
  } catch (error) {
    console.error(`Error creating assignment for course ${courseId}:`, error);
    throw error;
  }
};

export const findAssignmentsForCourse = async (courseId: string): Promise<Assignment[]> => {
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching assignments for course ${courseId}:`, error);
    return [];
  }
};

export const findCoursesByEnrolledUser = async (userId: string = 'current'): Promise<Course[]> => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return []; 
  }
};

