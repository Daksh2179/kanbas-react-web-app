import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
  enrollment: {
      user: "",
      course: ""
  }
}

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (state, { payload: enrollment }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
      console.log(newEnrollment, state.enrollments);
    },
    unenroll: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(e.user === enrollment.user && e.course === enrollment.course)
      );
    },
//     addEnrollment: (state, action) => {
//       const newErollment: any = [
//           ...state.enrollments,
//           {
//               ...action.payload,
//               _id: new Date().getTime().toString()
//           }
//       ]
//       state.enrollments = newErollment;
//       state.enrollment = {
//           user: "",
//           course: ""
//       }
//   },
//   deleteEnrollment: (state, action) => {
//     state.enrollments = state.enrollments.filter(
//         (e: any) => !(e.user === action.payload.user && e.course === action.payload.course)
//     );
// }
}
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;