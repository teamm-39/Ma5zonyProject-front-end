import axios from "axios";

export const deleteSupplier = async (id) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}Supplier/delete/${id}`,{withCredentials:true}
    );
    return res.data;
  } catch (e) {
    const errorMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
