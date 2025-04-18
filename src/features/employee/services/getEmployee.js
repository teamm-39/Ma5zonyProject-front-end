import axios from 'axios';

const getEmployee = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}User/details/${id}`,{withCredentials: true});
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};

export default getEmployee;