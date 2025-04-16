import axios from "axios";

// ضبط إعدادات Axios الافتراضية للتأكد من إرسال الكوكيز
axios.defaults.withCredentials = true;

export const getStores = async (pageNumber, pageSize, name, country, city) => {
  try {
    // إنشاء الباراميترز
    const params = {
      pageSize,
      pageNumber,
    };
    if (name) params.name = name;
    if (country) params.country = country;
    if (city) params.city = city;

    // تأكيد الـ URL (نستخدم /api/Store بدل /Store)
    const apiUrl = `${import.meta.env.VITE_API_URL}api/Store`;
    console.log('Sending request to:', apiUrl, 'Params:', params);

    // إرسال الطلب
    const res = await axios.get(apiUrl, {
      params,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', res.data);
    return res.data;
  } catch (e) {
    // لوج الأخطاء بالتفصيل
    console.error('Error fetching stores:', {
      status: e.response?.status,
      data: e.response?.data,
      message: e.message,
    });
    throw e; // رمي الخطأ عشان الكود اللي بيستدعي الدالة يتعامل معاه
  }
};