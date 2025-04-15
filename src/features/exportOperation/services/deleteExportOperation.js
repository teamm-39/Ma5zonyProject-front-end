import axios from "axios"

export const deleteExportOperation = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}ExportOperation/delete/${id}`,{withCredentials: true});
    return res?.data;
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}