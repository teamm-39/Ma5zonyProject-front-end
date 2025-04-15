import axios from 'axios';

const editStore = async (data,toast) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}Store/Edit`,data,{withCredentials: true});
    return response.data;
  } catch {
    toast.current.show({
      severity: "error",
      summary: "فشل",
      detail: "حدث خطأ ما",
      life: 3000,
    });
  }
};

export default editStore;