import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Courses/enrollmentReducer";

// Create the store with all reducers
const store = configureStore({
  reducer: {
    modules: modulesReducer,
    auth: accountReducer,
    assignments: assignmentReducer,
    people: enrollmentReducer, // This handles both enrollments and users state
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;

export default store;