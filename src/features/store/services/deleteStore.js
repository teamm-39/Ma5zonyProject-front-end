import axios from "axios";

export const deleteStore = async (id) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}Store/delete/${id}`,{withCredentials: true}
    );
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
