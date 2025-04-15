import axios from "axios"

export const addSupplier = async (formData) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}Supplier/create`, formData,{withCredentials:true});
    return res.data;
  }catch(error){
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}