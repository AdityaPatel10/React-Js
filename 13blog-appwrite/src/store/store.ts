import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    //TODO: Add More Slice here for 'posts'
  },
});

export default store;
