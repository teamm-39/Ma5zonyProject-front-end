import axios from "axios"

export const addSupplier = async (formData) => {
  try {
    const res = await axios.post("https://localhost:7213/api/Supplier/create", formData);
    return res.data;
  }catch(error){
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}