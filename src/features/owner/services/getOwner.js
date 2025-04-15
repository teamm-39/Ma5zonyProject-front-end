import axios from 'axios';

const getOwner = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}Admin/details/${id}`,{withCredentials: true});
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};

export default getOwner;