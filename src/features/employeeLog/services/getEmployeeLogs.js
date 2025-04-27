import axios from "axios";

export const getEmployeeLogs = async (pageNumber, pageSize, filterValues) => {
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
    if (filterValues.oldUserName) params.oldUserName = filterValues.oldUserName;
    if (filterValues.newUserName) params.newUserName = filterValues.newUserName;
    if (filterValues.oldPhoneNumber) params.oldPhoneNumber = filterValues.oldPhoneNumber;
    if (filterValues.newPhoneNumber) params.newPhoneNumber = filterValues.newPhoneNumber;
    if (filterValues.oldAge) params.oldAge = filterValues.oldAge;
    if (filterValues.newAge) params.newAge = filterValues.newAge;
    if (filterValues.oldAddress) params.oldAddress = filterValues.oldAddress;
    if (filterValues.newAddress) params.newAddress = filterValues.newAddress;

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}UserLog`,{params,withCredentials: true},
    );
    return res.data;
  }
 catch (error) {
  const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
  throw new Error(errorMessage);
}
}