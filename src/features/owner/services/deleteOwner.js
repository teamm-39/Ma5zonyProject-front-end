import axios from 'axios';

const deleteOwner = async (id) => {
  try {
    const response = await axios.delete(`http://makhzon.runasp.net/api/Admin/delete/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};

export default deleteOwner;