import axios from "axios";

export const getOwners = async (pageNumber, pageSize,filterValues,toast) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    if (filterValues.name) params.name = filterValues.name;
    if (filterValues.userName) params.userName = filterValues.userName;
    if (filterValues.age) params.age = filterValues.age;
    if (filterValues.phone) params.phone = filterValues.phone;
    if (filterValues.address) params.address = filterValues.address;
    const res = await axios.get(
      `https://localhost:7213/api/Admin`,{params}
    );
    return res.data;
  } catch {
    toast.current.show({
      severity: "error",
      summary: "فشل",
      detail: "حدث خطأ ما",
      life: 3000,
    });
  }
};
