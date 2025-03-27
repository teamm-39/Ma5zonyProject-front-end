import axios from "axios"

export const getExportOperations = async (pageSize , pageNumber,filterValues) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    if (filterValues.userName) params.userName = filterValues.userName;
    if (filterValues.customerName) params.customerName = filterValues.customerName;
    if (filterValues.date) {
      const localDate = new Date(filterValues.date);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
      params.dateTime = localDate.toISOString().split("T")[0];
    }

    const res = await axios.get("https://localhost:7213/api/ExportOperation", {params});
    return res?.data
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
}