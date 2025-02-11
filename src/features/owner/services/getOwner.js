import axios from 'axios';

const getOwner = async (id) => {
  try {
    const response = await axios.get(`http://makhzon.runasp.net/api/Admin/details/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};

export default getOwner;