import axios from "axios"

export const getCustomer = async (id) => {
  try {
    const res = await axios.get(`https://localhost:7213/api/Customer/details/${id}`);
    return res.data
  } catch (e){
    const errorMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}