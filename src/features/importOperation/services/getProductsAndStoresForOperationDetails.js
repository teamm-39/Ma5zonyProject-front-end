import axios from "axios"

export const getProductsAndStoresForOperationDetails = async (id,pageSize,pageNumber) => {
  try {
    const params = {
      pageSize,
      pageNumber
    }
    const res = await axios.get(`https://localhost:7213/api/ImortOperation/details/get-products-to-stores/${id}`, {params});
    return res?.data
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}