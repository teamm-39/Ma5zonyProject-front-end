import axios from "axios";

export const getProductsAndStoresForOperationDetails = async (
  id,
  pageSize,
  pageNumber
) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}ExportOperation/details/get-products-from-stores/${id}`,
      { params, withCredentials: true }
    );
    return res?.data;
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
};
