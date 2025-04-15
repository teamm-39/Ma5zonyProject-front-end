import axios from 'axios';

const deleteOwner = async (id) => {
  try {
    const response = await axios.delete(`https://localhost:7213/api/Admin/delete/${id}`,{withCredentials: true});
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};

export default deleteOwner;