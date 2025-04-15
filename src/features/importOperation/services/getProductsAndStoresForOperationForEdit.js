import axios from "axios";

export const getProductsAndStoresForOperationForEdit = async (id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}ImortOperation/details/get-products-to-stores-for-edit/${id}`,{withCredentials: true}
    );
    return res?.data;
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
};
