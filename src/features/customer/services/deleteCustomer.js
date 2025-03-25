import axios from "axios";

export const deleteCustomer = async (id) => {
  try {
    const res = await axios.delete(
      `https://localhost:7213/api/Customer/delete/${id}`
    );
    return res.data;
  } catch (e) {
    const errorMessage = e.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
