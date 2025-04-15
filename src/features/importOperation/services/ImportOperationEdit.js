import axios from "axios";

export const ImportOperationEdit = async (data) => {
  try {
    console.log(data);

    const params = {
      supplierId: data.formData.supplierId,
      SP: data.formData.sp.map(item => ({
        productId: item.productId,
        quantity: Number(item.quantity),
        toStoreId:item.toStoreId
      }))
    }
    const res = await axios.put(`${import.meta.env.VITE_API_URL}ImortOperation/edit/${data.id}`, params,{withCredentials: true}
     );
    return res?.data
  } catch (e) {
    const eMessage=e.response?.data?.meesage  || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}