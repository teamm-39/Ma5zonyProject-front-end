import axios from "axios"

export const getCustomersForOperation = async () => {
  try {
    const res = await axios.get("https://localhost:7213/api/Customer/get-customers-for-operation");
    return res?.data
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}