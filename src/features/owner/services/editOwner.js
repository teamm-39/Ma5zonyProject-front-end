import axios from "axios";

export const editOwner = async (formData) => {
  try {
    const data = new FormData();

    data.append("Id", formData.id);
    data.append("Name", formData.name);
    data.append("UserName", formData.userName);
    data.append("Age", formData.age);
    data.append("Email", formData.email);
    if (formData.phoneNumber) {
      data.append("PhoneNumber", formData.phoneNumber);
    }
    if (formData.address) {
      data.append("Address", formData.address);
    }
    if (formData.password) {
      data.append("Password", formData.password);
      data.append("ConfirmPassword", formData.confirmPassword);
    }
    if (formData.img) {
      data.append("img", formData.img);
    }

    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}Admin/edit`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.meesage || "حدث خطأ غير متوقع";
    throw new Error(errorMessage);
  }
};
