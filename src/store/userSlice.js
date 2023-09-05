import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    add: (state, action) => {
      return action.payload;
    },
  },
});

export const { add } = userSlice.actions;

export default userSlice.reducer;
