import axios from "axios";

export const getProductsForeStore = async (id,pageNumber, pageSize) => {
  try {
    const params = {
      pageNumber,
      pageSize,
    };
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}get-products-for-store/${id}`,{params,withCredentials: true}
    );
    return res.data;
  } catch (e) {
    const errorMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
