import axios from "axios";

export const getStores = async (pageNumber, pageSize, name, country, city) => {
  try {
    const params = {
      pageSize,
      pageNumber,
    };
    if (name) params.name = name;
    if (country) params.country = country;
    if (city) params.city = city;
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}Store`,
      {
        params,
        withCredentials: true
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
