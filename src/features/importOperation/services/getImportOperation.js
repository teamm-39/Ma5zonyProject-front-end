import axios from "axios"

export const getImportOperation = async (id) => {
  try {
    const res = await axios.get(`https://localhost:7213/api/ImortOperation/details/${id}`);
    return res?.data
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}