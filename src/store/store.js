import { configureStore } from '@reduxjs/toolkit';
import userProfileSlice from './slices/userProfileSlice';
export const store = configureStore({
  reducer: {
    user:userProfileSlice
  },
})