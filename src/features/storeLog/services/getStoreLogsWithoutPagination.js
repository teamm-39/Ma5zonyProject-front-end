import axios from "axios";

export const getStoreLogsWithoutPagination = async (filterValues) => {
  try {
    const params = {
    };
    if (filterValues.name) params.name = filterValues.name;
    if (filterValues.operationType) params.operationType = filterValues.operationType;
    if (filterValues.storeName) params.storeName = filterValues.storeName;
    if (filterValues.userName) params.userName = filterValues.userName;
    if (filterValues.dateTime) {
      const localDate = new Date(filterValues.dateTime);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // تعويض فرق التوقيت
      params.dateTime = localDate.toISOString().split("T")[0];
    }
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}StoreLog/getAllWithoutPagination`, { params, withCredentials: true },
    );
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}