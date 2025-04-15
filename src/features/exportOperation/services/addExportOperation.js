import axios from "axios"

export const addExportOperation = async (data) => {
  try {
    const params = {
      customerId: data.customerId,
      SP: data.sp.map(item => ({
        productId: item.productId,
        quantity: Number(item.quantity),
        fromStoreId:item.storeId
      }))
    }
    const res = await axios.post(`${import.meta.env.VITE_API_URL}ExportOperation/create`, params,
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