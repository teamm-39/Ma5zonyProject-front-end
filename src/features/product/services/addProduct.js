import axios from "axios"

export const addProduct = async (formData) => {
  try {
    const res = await axios.post("https://localhost:7213/api/Product/crete", formData);
    return res.data;
  }catch(error){
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}