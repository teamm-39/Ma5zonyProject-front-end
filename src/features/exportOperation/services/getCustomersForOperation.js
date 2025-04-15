import axios from "axios"

export const getCustomersForOperation = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}Customer/get-customers-for-operation`);
    return res?.data
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}