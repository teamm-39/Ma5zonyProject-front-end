import axios from "axios";

export const deleteStore = async (id, toast) => {
  try {
    const res = await axios.delete(
      `https://localhost:7213/api/Store/delete/${id}`
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
