import axios from "axios";

export const addStore = async (data,toast) => {
  try {
    const res = await axios.post("https://localhost:7213/api/Store/create", data);
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
