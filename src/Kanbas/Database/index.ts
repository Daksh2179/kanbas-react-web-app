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
    role: 'FACULTY' | 'STUDENT' | 'TA';  // Make this a union type
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

// State interfaces
export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export interface PeopleState {
    users: User[];
    enrollments: Enrollment[];
    loading: boolean;
    error: string | null;
}

export interface AssignmentsState {
    assignments: Assignment[];
    loading: boolean;
    error: string | null;
}

export interface CourseState {
    courses: Course[];
    loading: boolean;
    error: string | null;
}

export interface RootState {
    auth: AuthState;
    people: PeopleState;
    assignments: AssignmentsState;
    courses: CourseState;
}

// Action Types
export type AuthAction = 
    | { type: 'LOGIN_SUCCESS'; payload: User }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'CLEAR_ERROR' };

export type PeopleAction = 
    | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
    | { type: 'FETCH_ENROLLMENTS_SUCCESS'; payload: Enrollment[] }
    | { type: 'ADD_ENROLLMENT'; payload: Enrollment }
    | { type: 'REMOVE_ENROLLMENT'; payload: { courseId: string; userId: string } }
    | { type: 'UPDATE_ENROLLMENT'; payload: { courseId: string; userId: string; status: string } }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'CLEAR_ERROR' };

// Type assertions
export const modules = modulesData;
export const enrollment = enrollmentData as Enrollment[];
export const users = userData as User[];
export const assignments = assignmentData as unknown as Assignment[];
export const courses = coursesData as Course[];

// Type guard
export function isValidRole(role: string): role is "FACULTY" | "STUDENT" | "TA" {
    return ["FACULTY", "STUDENT", "TA"].includes(role);
}

export function isUser(user: any): user is User {
    return (
        typeof user === 'object' &&
        user !== null &&
        typeof user._id === 'string' &&
        typeof user.username === 'string' &&
        typeof user.role === 'string' &&
        isValidRole(user.role)
    );
}