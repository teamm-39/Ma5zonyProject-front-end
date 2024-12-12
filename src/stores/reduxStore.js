import { configureStore } from "@reduxjs/toolkit";
import useLogin  from "../services/LoginService";

// إعداد الـ Store
const store = configureStore({
  reducer: {
    auth: useLogin.reducer ,
  },
});

export default store;