import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://makhzon.runasp.net/api/Users/sign-in', {
      email,
      password
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};