import axios from "axios";

export const getProducts = async (pageNumber, pageSize) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}Product/get-products-below-minimum`, { params , withCredentials: true }
    );
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};