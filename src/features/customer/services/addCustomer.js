import axios from "axios";

export const addCustomer=async (formData) => {
  try {
    const res = await axios.post("https://localhost:7213/api/Customer/create", formData,{withCredentials:true});
    return res.data;
  }catch(error){
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}