// src/Kanbas/Database/index.ts

import coursesData from "./courses.json";
import modulesData from "./modules.json"; 
import enrollmentData from "./enrollment.json";
import userData from "./user.json";

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

// Type assertions
export const courses = coursesData;
export const modules = modulesData;
export const enrollment = enrollmentData as Enrollment[];
export const user = userData as User[];

// You might want to add interfaces for courses and modules as well

// Type guard to check if a role is valid
export function isValidRole(role: string): role is "FACULTY" | "STUDENT" | "TA" {
    return ["FACULTY", "STUDENT", "TA"].includes(role);
}