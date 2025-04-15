import axios from "axios"

export const getSuppliersForOperation = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}Supplier/get-suppliers-for-operation`,{withCredentials: true});
    return res?.data
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}