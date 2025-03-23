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
    const res = await axios.put(`https://localhost:7213/api/ImortOperation/edit/${data.id}`, params
     );
    return res?.data
  } catch (e) {
    const eMessage=e.response?.data?.meesage  || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
}