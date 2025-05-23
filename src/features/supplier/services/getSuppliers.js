import axios from "axios";

export const getSuppliers = async (pageNumber, pageSize, filterValues) => {
  try{
    const params = {
      pageSize,
      pageNumber,
    };
    if (filterValues.name) params.name = filterValues.name;
    if (filterValues.age) params.age = filterValues.age;
    if (filterValues.address) params.address = filterValues.address;
    if (filterValues.numOfDeal) params.numOfDeal = filterValues.numOfDeal;
    if (filterValues.isReliable !== undefined && filterValues.isReliable !== null && filterValues.isReliable !== "") {
      params.isReliable = filterValues.isReliable;
  }
    if (filterValues.phoneNum) params.phoneNum = filterValues.phoneNum;
    if (filterValues.email) params.email = filterValues.email.trim();
    const queryString = new URLSearchParams(params).toString();
    const url = `${import.meta.env.VITE_API_URL}Supplier?${decodeURIComponent(queryString)}`;
    const res = await axios.get(
      url,{withCredentials:true}
    );
    return res.data;
  } catch (e) {
    const errorMessage = e.response?.data?.message || "حدث خطأ غير متوقع";
    throw new Error(errorMessage)
  }
}