import axios from "axios";

export const addStore = async (data,toast) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}Store/create`, data,{withCredentials: true});
    return res.data;
  } catch {
    toast.current.show({
      severity: "error",
      summary: "فشل",
      detail: "حدث خطأ ما",
      life: 3000,
    });
  }
};
