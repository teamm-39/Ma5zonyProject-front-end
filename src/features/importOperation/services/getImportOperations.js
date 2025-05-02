import axios from "axios"

export const getImportOperations = async (pageSize , pageNumber,filterValues) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    if (filterValues.userName) params.userName = filterValues.userName;
    if (filterValues.supplierName) params.supplierName = filterValues.supplierName;
    if (filterValues.fromDateTime) {
      const localDate = new Date(filterValues.fromDateTime);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // تعويض فرق التوقيت
      params.fromDateTime = localDate.toISOString().split("T")[0];
    }
    if (filterValues.toDateTime) {
      const localDate = new Date(filterValues.toDateTime);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // تعويض فرق التوقيت
      params.toDateTime = localDate.toISOString().split("T")[0];
    }

    const res = await axios.get(`${import.meta.env.VITE_API_URL}ImortOperation`, {params, withCredentials: true});
    return res?.data
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}