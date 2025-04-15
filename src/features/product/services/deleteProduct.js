import axios from "axios";

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}Product/delete/${id}`);
    return res.data;
  } catch (e) {
    const errMsg = e.response?.data?.message || "حدث خطأ غير متوقع";
    throw new Error(errMsg);
  }
};
