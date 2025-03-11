import axios from 'axios';

const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`https://localhost:7213/api/User/delete/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};

export default deleteEmployee;