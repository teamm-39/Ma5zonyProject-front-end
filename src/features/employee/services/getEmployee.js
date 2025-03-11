import axios from 'axios';

const getEmployee = async (id) => {
  try {
    const response = await axios.get(`https://localhost:7213/api/User/details/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};

export default getEmployee;