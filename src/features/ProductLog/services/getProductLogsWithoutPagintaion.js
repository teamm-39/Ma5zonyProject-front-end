import axios from "axios";

export const getProductLogsWithoutPagination = async (filterValues) => {
  try {
    const params = {
    }
    if (filterValues.dateTime) {
      const localDate = new Date(filterValues.dateTime);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // تعويض فرق التوقيت
      params.dateTime = localDate.toISOString().split("T")[0];
    }
    if (filterValues.operationType) params.operationType = filterValues.operationType;
    if (filterValues.userName) params.userName = filterValues.userName;
    if (filterValues.oldProductName) params.oldProductName = filterValues.oldProductName;
    if (filterValues.newProductName) params.newProductName = filterValues.newProductName;
    if (filterValues.oldSellingPrice) params.oldSellingPrice = filterValues.oldSellingPrice;
    if (filterValues.newSellingPrice) params.newSellingPrice = filterValues.newSellingPrice;
    if (filterValues.oldPurchasePrice) params.oldPurchasePrice = filterValues.oldPurchasePrice;
    if (filterValues.newPurchasePrice) params.newPurchasePrice = filterValues.newPurchasePrice;
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}ProductLog/getAllWithoutPagination`,{params,withCredentials: true},
    );
    return res.data;
  }
 catch (error) {
  const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
  throw new Error(errorMessage);
}
}