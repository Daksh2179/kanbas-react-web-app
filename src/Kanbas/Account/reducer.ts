import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: [],
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = [];
    }
  },
});
export const { setCurrentUser, clearCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;