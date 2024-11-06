import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for currentUser and the initial state
interface CurrentUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: string;  // Define the type for role (you could add more fields as needed)
}

interface AccountState {
  currentUser: CurrentUser;
}

// Define the initial state with proper types
const initialState: AccountState = {
  currentUser: {
    role: '',
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: ""
  },
};

// Create the slice
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // The setCurrentUser action is typed with PayloadAction to specify the type of the payload
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
  },
});

// Export actions and reducer
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
