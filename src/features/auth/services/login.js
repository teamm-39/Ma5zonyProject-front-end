import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post('https://localhost:7213/api/Users/sign-in', {
      email,
      password
    },{
      withCredentials: true // Include cookies
  });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};