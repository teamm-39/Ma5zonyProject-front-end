import axios from "axios"

export const getSuppliersForOperation = async () => {
  try {
    const res = await axios.get("https://localhost:7213/api/Supplier/get-suppliers-for-operation");
    return res?.data
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}