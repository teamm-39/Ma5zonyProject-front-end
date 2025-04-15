import axios from "axios";

export const getProductsAndStoresForEditOperatiom = async (id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}ExportOperation/details/get-products-from-stores-for-edit/${id}`
    );
    return res?.data;
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
};
