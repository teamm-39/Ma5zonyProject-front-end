import axios from "axios"

export const editCustomer = async (formData) => {
  try {
    const res = await axios.put(`https://localhost:7213/api/Customer/edit`, formData);
    return res.data;
  } catch (e) {
    const errorMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}