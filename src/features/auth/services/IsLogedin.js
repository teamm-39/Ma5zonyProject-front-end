import axios from "axios";

export const isLogedIn = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}Users/is-loged-in`, { withCredentials: true });
    return response.data; // أعد البيانات المستلمة من الخادم
  } catch (e) {
    console.error(e); // سجل الخطأ للمراجعة
    return { data: false }; // أعد قيمة واضحة عند حدوث الخطأ (لتجنب undefined)
  }
};