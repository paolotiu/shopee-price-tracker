import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  isLoggedIn: boolean;
  items: string[];
}
const initialState = { email: "", isLoggedIn: false, items: [] } as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: {
      reducer(state, action: PayloadAction<UserState>) {
        const { email, isLoggedIn, items } = action.payload;
        state.email = email;
        state.items = items;
        state.isLoggedIn = isLoggedIn;
      },
      prepare(email, items, isLoggedIn) {
        return {
          payload: {
            email,
            items,
            isLoggedIn,
          },
        };
      },
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
