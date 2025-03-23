import axios from "axios";

export const getProductsAndStoresForOperationForEdit = async (id) => {
  try {
    const res = await axios.get(
      `https://localhost:7213/api/ImortOperation/details/get-products-to-stores-for-edit/${id}`
    );
    return res?.data;
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
};
