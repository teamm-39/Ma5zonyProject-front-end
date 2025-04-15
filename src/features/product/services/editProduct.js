import axios from "axios";

export const editProduct = async (formData) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}Product/edit`, formData,{withCredentials: true});
    return res.data;
  } catch (e) {
    const errorMessage = e.response?.data?.meesage  || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
