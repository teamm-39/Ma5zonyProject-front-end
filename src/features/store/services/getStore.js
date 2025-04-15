import axios from 'axios';

const getStore = async (storeId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}Store/get-store/${storeId}`);
    return response.data;
  } catch(error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};

export default getStore;