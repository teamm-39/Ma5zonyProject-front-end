import axios from "axios"

export const getStoresForOperation = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}Store/get-stores-for-operation`);
    return res?.data
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}