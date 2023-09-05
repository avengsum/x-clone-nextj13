// store.ts
import { configureStore } from '@reduxjs/toolkit';
import commentSlice from './commentSlice'; 
import userSlice from './userSlice.js';


const store = configureStore({
  reducer: {
    comment: commentSlice,
    user :  userSlice
  },
});

export default store;
