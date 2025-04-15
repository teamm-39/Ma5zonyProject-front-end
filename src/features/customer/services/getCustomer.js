import axios from "axios"

export const getCustomer = async (id) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}Customer/details/${id}`,{withCredentials: true});
    return res.data
  } catch (e){
    const errorMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}