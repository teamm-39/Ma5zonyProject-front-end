import axios from "axios";

export const getStores = async (pageNumber, pageSize) => {
  try {
    const res = await axios.get(
      `http://makhzon.runasp.net/api/Store?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
