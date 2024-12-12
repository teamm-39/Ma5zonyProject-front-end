import { createSlice } from "@reduxjs/toolkit";
const useLogin = createSlice({
  name: "auth",
  initialState: {
    isLogedIn:true
  },
  reducers: {
    login:(state) => {
    state.isLogedIn=true
    },
    logout: (state) => {
      state.isLogedIn = false; // تسجيل الخروج
    }
  }
})
// تصدير الإجراءات (Actions)
export const { login, logout } = useLogin.actions;

// تصدير Reducer
export default useLogin;