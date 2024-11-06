import { createSlice } from "@reduxjs/toolkit";
import { assignments as dbAssignments, Course } from "../../Database";


// Define TypeScript interfaces
interface Assignment {
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

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: dbAssignments,
};

// Create assignments slice
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      const newAssignment: Assignment = {
        id: new Date().getTime().toString(),
        name: payload.name,
        description: payload.description,
        points: payload.points,
        group: payload.group,
        gradeDisplay: payload.gradeDisplay,
        submissionType: payload.submissionType,
        dueDate: payload.dueDate,
        availableFrom: payload.availableFrom,
        availableUntil: payload.availableUntil,
        course: ""
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload }) => {
      state.assignments = state.assignments.filter((a) => a.id !== payload);
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map((a) =>
        a.id === payload.id ? payload : a
      );
    },
  },
});

// Export actions and reducer
export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
