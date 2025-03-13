import axios from "axios";

export const editProduct = async (formData) => {
  try {
    const res = axios.put(`https://localhost:7213/api/Product/edit`, formData);
    return res.data
  } catch (e) {
    const errorMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
}
};