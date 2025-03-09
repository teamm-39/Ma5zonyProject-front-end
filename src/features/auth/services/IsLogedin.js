import axios from "axios";

export const isLogedIn = async () => {
  try {
    const response = await axios.get('https://localhost:7213/api/Users/is-loged-in',{withCredentials:true});
    return response.data;
  } catch (e) {
    console.log(e);
  }
};