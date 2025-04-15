import axios from 'axios';

const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}User/delete/${id}`,{withCredentials: true});
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};

export default deleteEmployee;