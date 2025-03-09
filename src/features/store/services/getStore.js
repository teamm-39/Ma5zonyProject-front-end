import axios from 'axios';

const getStore = async (storeId,toast) => {
  try {
    const response = await axios.get(`https://localhost:7213/api/Store/get-store/${storeId}`);
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

export default getStore;