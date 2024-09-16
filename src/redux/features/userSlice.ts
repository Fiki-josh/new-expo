import { ReturnedUser } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { user: ReturnedUser | null } = { user: null};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
