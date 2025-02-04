import axios from "axios";

export const addStore = async (data) => {
  try {
    const res = await axios.post("http://makhzon.runasp.net/api/Store/create", data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
