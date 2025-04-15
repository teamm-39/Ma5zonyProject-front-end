import axios from "axios"

export const editCustomer = async (formData) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}Customer/edit`, formData,{withCredentials: true});
    return res.data;
  } catch (e) {
    const errorMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}