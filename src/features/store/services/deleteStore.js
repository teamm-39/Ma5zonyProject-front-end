import axios from "axios";

export const deleteStore = async (id, toast) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}Store/delete/${id}`
    );
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
