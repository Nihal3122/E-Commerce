import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
