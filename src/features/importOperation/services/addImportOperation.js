import axios from "axios"

export const addImportOperation = async (data) => {
  try {
    const params = {
      supplierId: data.supplierId,
      SP: data.sp.map(item => ({
        productId: item.productId,
        quantity: Number(item.quantity),
        toStoreId:item.storeId
      }))
    }
    const res = await axios.post(`${import.meta.env.VITE_API_URL}ImortOperation/create`, params,
      {
        withCredentials: true
      }
     );
    return res?.data
  } catch (e) {
    const eMessage=e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}