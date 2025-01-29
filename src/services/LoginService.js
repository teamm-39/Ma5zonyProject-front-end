import { createSlice } from "@reduxjs/toolkit";
const useLogin = createSlice({
  name: "auth",
  initialState: {
    isLogedIn: true,
  },
  reducers: {
    logedIn: (state) => {
      state.isLogedIn = true;
    },
    logout: (state) => {
      state.isLogedIn = false; // تسجيل الخروج
    },
  },
});
// تصدير الإجراءات (Actions)
export const { logedIn, logout } = useLogin.actions;

// تصدير Reducer
export default useLogin;
