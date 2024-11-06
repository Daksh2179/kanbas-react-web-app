import coursesData from "./courses.json";
import modulesData from "./modules.json"; 
import enrollmentData from "./enrollment.json";
import userData from "./user.json";
import assignmentData from "./assignments.json";

export interface Enrollment {
    _id: string;
    user: string;
    course: string;
}

export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}

export interface Assignment {
    id: string;
    name: string;
    description: string;
    points: number;
    group: string;
    gradeDisplay: string;
    submissionType: string;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
    course: string;
  }

export interface AssignmentsState {
    assignments: Assignment[];
}

export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    description: string;
}

// Type assertions
export const modules = modulesData;
export const enrollment = enrollmentData as Enrollment[];
export const user = userData as User[];
export const assignments = assignmentData as unknown as Assignment[];
export const Course = coursesData;

// Type guard to check if a role is valid
export function isValidRole(role: string): role is "FACULTY" | "STUDENT" | "TA" {
    return ["FACULTY", "STUDENT", "TA"].includes(role);
}