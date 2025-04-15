import axios from "axios"

export const getImportOperations = async (pageSize , pageNumber,filterValues) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    if (filterValues.userName) params.userName = filterValues.userName;
    if (filterValues.supplierName) params.supplierName = filterValues.supplierName;
    if (filterValues.date) {
      const localDate = new Date(filterValues.date);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // تعويض فرق التوقيت
      params.dateTime = localDate.toISOString().split("T")[0];
    }

    const res = await axios.get(`${import.meta.env.VITE_API_URL}ImortOperation`, {params, withCredentials: true});
    return res?.data
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}