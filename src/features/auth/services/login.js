import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}Users/sign-in`, {
      email,
      password
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};