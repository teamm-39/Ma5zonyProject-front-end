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
    if (filterValues.isReliable==false || filterValues.isReliable==true) params.isReliable = filterValues.isReliable;
    if (filterValues.phoneNum) params.phoneNum = filterValues.phoneNum;
    if (filterValues.email) params.email = filterValues.email.trim();
    const queryString = new URLSearchParams(params).toString();
    const url = `https://localhost:7213/api/Supplier?${decodeURIComponent(queryString)}`;
    const res = await axios.get(
      url
    );
    return res.data;
  } catch (e) {
    const errorMessage = e.response?.data?.message || "حدث خطأ غير متوقع";
    throw new Error(errorMessage)
  }
}