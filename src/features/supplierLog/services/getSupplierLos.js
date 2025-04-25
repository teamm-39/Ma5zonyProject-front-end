import axios from "axios";

export const getSupplierLogs = async (pageNumber, pageSize, filterValues) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    }
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
    if (filterValues.operationType) params.operationType = filterValues.operationType;
    if (filterValues.userName) params.userName = filterValues.userName;
    if (filterValues.oldName) params.oldName = filterValues.oldName;
    if (filterValues.newName) params.newName = filterValues.newName;
    if (filterValues.oldEmail) params.oldEmail = filterValues.oldEmail;
    if (filterValues.newEmail) params.newEmail = filterValues.newEmail;
    if (filterValues.oldPhoneNumber) params.oldPhoneNumber = filterValues.oldPhoneNumber;
    if (filterValues.newPhoneNumber) params.newPhoneNumber = filterValues.newPhoneNumber;
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}SupplierLog`,{params,withCredentials: true},
    );
    return res.data;
  }
 catch (error) {
  const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
  throw new Error(errorMessage);
}
}