import axios from "axios"

export const getStoresForOperation = async () => {
  try {
    const res = await axios.get("https://localhost:7213/api/Store/get-stores-for-operation");
    return res?.data
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}