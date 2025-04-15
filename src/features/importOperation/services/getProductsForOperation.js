import axios from "axios"

export const getProductsForOperation = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}Product/get-products-for-import-operation`,{withCredentials: true});
    return res?.data
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}