import axios from "axios";

export const getStoreLogs = async (pageNumber, pageSize,filterValues) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    if (filterValues.name) params.name = filterValues.name;
    if (filterValues.dateTime) params.dateTime = filterValues.dateTime;
    if (filterValues.storeName) params.storeName = filterValues.storeName;
    if (filterValues.userName) params.userName = filterValues.userName;
    if (filterValues.operationType) {
      const localDate = new Date(filterValues.dateTime);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // تعويض فرق التوقيت
      params.dateTime = localDate.toISOString().split("T")[0];
    }
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}StoreLog`,{params,withCredentials: true},
    );
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
