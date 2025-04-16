import axios from "axios";

export const isLogedIn = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}Users/is-loged-in`,{withCredentials:true});
    return response.data;
  } catch (e) {
    console.log(e);
  }
};