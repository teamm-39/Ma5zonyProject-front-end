import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  "name": "user",
  "age": "",
  "userName":"",
  "email": "",
  "phoneNumber": "",
  "imgUrl": "",
  "address": "",
  "roleName": ""
  , "password": "",
  "confirmPassword": ""
};
const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.imgUrl = action.payload.imgUrl;
      state.address = action.payload.address;
      state.roleName = action.payload.roleName;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
    deleteUser() {
     return initialState;
    }
  }
})
export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;