import axios from "axios"

export const deleteExportOperation = async (id) => {
  try {
    const res = await axios.delete(`https://localhost:7213/api/ExportOperation/delete/${id}`);
    return res?.data;
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}