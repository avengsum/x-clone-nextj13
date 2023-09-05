import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggle } = commentSlice.actions;

export default commentSlice.reducer;
