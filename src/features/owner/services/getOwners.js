import axios from "axios";

export const getOwners = async (pageNumber, pageSize,filterValues) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    if (filterValues.name) params.name = filterValues.name;
    if (filterValues.userName) params.userName = filterValues.userName;
    if (filterValues.age) params.age = filterValues.age;
    if (filterValues.phone) params.phone = filterValues.phone;
    if (filterValues.address) params.address = filterValues.address;
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}Admin`,{params,withCredentials: true},
    );
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
