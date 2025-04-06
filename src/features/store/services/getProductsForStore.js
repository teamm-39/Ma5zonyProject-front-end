import axios from "axios";

export const getProductsForeStore = async (id,pageNumber, pageSize) => {
  try {
    const params = {
      pageNumber,
      pageSize,
    };
    const res = await axios.get(
      `https://localhost:7213/get-products-for-store/${id}`,{params}
    );
    return res.data;
  } catch (e) {
    const errorMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
