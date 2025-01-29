import axios from "axios";

export const IsLogedin = async () => {
  try {
    const response = await axios.get(
      "http://makhzon.runasp.net/api/Users/is-loged-in"
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
