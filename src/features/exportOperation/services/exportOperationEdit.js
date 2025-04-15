import axios from "axios";

export const exportOperationEdit = async (data) => {
  try {
    console.log(data);

    const params = {
      customerId: data.formData.customerId,
      SP: data.formData.sp.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity),
        fromStoreId: item.fromStoreId,
      })),
    };
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}ExportOperation/edit/${data.id}`,
      params,
      { withCredentials: true }
    );
    return res?.data;
  } catch (e) {
    const eMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(eMessage);
  }
};
