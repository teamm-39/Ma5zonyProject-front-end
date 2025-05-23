import axios from "axios";

export const getProducts = async (pageNumber, pageSize,filterValues) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    if (filterValues.name) params.name = filterValues.name;
    if (filterValues.sellingPrice) params.sellingPrice = filterValues.sellingPrice;
    if (filterValues.purchasePrice) params.purchasePrice = filterValues.purchasePrice;
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}Product`,{params,withCredentials: true},
    );
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
