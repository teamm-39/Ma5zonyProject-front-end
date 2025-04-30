import axios from "axios";

export const getExportOperationsInYear = async (year) => {
  try {
    const params = {
      year
    };
    const res = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }ExportOperation/get-total-operations-in-year`,
      { params, withCredentials: true }
    );
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
