import axios from "axios"

export const addProduct = async (formData) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}Product/crete`, formData,{withCredentials: true});
    return res.data;
  }catch(error){
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}