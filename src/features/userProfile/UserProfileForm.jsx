import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContext } from "../../App";
import blankUpload from "../../assets/imgs/blank-upload-img.svg";
import { useNavigate } from "react-router-dom";
import { editUserProfile } from "./services/editUserProfile";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import AppPagesCard from "../../components/AppPagesCard";
import logOut from "../../services/logOut";
function UserProfileForm() {
  const user = useSelector((state) => state.user);
  const toast = useContext(ToastContext);
  const [imagePreview, setImagePreview] = useState(blankUpload);
  if (!user) {
    toast.current?.show({
      severity: "error",
      summary: "فشل",
      detail: "لم يتم العثور على المستخدم",
      life: 3000,
    });
  }
  console.log(user);

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    age: null,
    img: null,
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        userName: user.userName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        password: user.password || "",
        confirmPassword: user.confirmPassword || "",
        age: user.age || null,
        img: null,
        roleName: user.roleName || "",
      });
      if (user.imgUrl) {
        setImagePreview(import.meta.env.VITE_PROFILE_IMGS + user.imgUrl);
      }
    }
  }, [user]);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        img: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [invalidName, setInvalidName] = useState(false);
  const [invalidUserName, setInvalidUserName] = useState(false);
  const [invalidAge, setInvalidAge] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [
    passwordIsNotEqualConfirmPassword,
    setPasswordIsNotEqualConfirmPassword,
  ] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const userNameRegx = /^[a-zA-Z0-9]+$/;
  const isValidData = () => {
    let isValid = true;
    if (!formData.name.trim()) {
      isValid = false;
      setInvalidName(true);
    }
    if (!formData.userName.trim() || !userNameRegx.test(formData.userName)) {
      isValid = false;
      setInvalidUserName(true);
    }
    if (!formData.age || formData.age < 11 || formData.age > 100) {
      isValid = false;
      setInvalidAge(true);
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      isValid = false;
      setInvalidEmail(true);
    }
    if (formData.password.trim() && formData.password.length < 6) {
      isValid = false;
      setInvalidPassword(true);
    }
    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      setPasswordIsNotEqualConfirmPassword(true);
    }
    return isValid;
  };
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: editUserProfile,
    onSuccess: () => {
      logOut();
      navigate("/Login");
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم تعديل الملف بنجاح",
        life: 3000,
      });
    },
    onError: (e) => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: e.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    },
  });
  const handleSubmit = () => {
    if (!isValidData()) {
      return;
    }
    const dataToSend = { ...formData };
    if (imagePreview === blankUpload || formData.img == null) {
      delete dataToSend.img;
    }
    mutate(dataToSend);
  };
  return (
    <>
      <AppPagesCard title="تعديل الملف الشخصى">
        <div className="row">
          <div className="col-md-6 col-12 oreder-0 order-md-1 align-content-center">
            <div className="input-container">
              <div className="d-flex justify-content-center">
                {imagePreview != blankUpload ? (
                  <>
                    <div className="position-relative">
                      <img
                        src={imagePreview}
                        alt="profile preview"
                        className="profile-preview position-relative"
                        style={{
                          width: "160px",
                          height: "160px",
                          cursor: "pointer",
                          borderRadius: "50%",
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                        onClick={() => document.getElementById("image").click()}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={imagePreview}
                      alt="profile preview"
                      className="profile-preview"
                      style={{
                        width: "160px",
                        height: "160px",
                        cursor: "pointer",
                        borderRadius:
                          imagePreview !== blankUpload ? "50%" : "0",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                      onClick={() => document.getElementById("image").click()}
                    />
                  </>
                )}
              </div>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 order-md-0 order-1">
            <div className="input-container mb-4">
              <label htmlFor="name">اسم المستخدم</label>
              <span className="star">*</span>
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) => {
                  handleChange(e);
                  setInvalidName(!e.target.value.trim());
                }}
                aria-describedby="username-help"
                className={invalidName ? "p-invalid" : ""}
                placeholder="ادخل الاسم"
              />
              {invalidName && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="userName">اسم المستخدم</label>
              <span className="star">*</span>
              <InputText
                id="userName"
                value={formData.userName}
                onChange={(e) => {
                  handleChange(e);
                  setInvalidUserName(
                    !e.target.value.trim() || !userNameRegx.test(e.target.value)
                  );
                }}
                aria-describedby="username-help"
                className={invalidUserName ? "p-invalid" : ""}
                placeholder="ادخل اسم المستخدم"
              />
              {invalidUserName && (
                <small className="input-warning">
                  يجب ان يحتوى اسم المستخدم على احرف او ارقام فقط
                </small>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12  mt-4 order-2">
            <div className="input-container">
              <label htmlFor="email">البريد الالكترونى</label>
              <span className="star">*</span>
              <InputText
                id="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                  const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  setInvalidEmail(
                    !e.target.value.trim() || !emailRegex.test(e.target.value)
                  );
                }}
                aria-describedby="username-help"
                className={invalidEmail ? "p-invalid" : ""}
                placeholder="ادخل البريد الالكترونى"
              />
              {invalidEmail && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12  mt-4 order-2">
            <div className="input-container">
              <label htmlFor="age">عمر السمتخدم</label>
              <span className="star">*</span>
              <InputNumber
                id="age"
                value={formData.age}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, age: e.value }));
                  setInvalidAge(!e.value || e.value < 11 || e.value > 100);
                }}
                aria-describedby="username-help"
                className={invalidAge ? "p-invalid" : ""}
                placeholder="ادخل العمر"
              />
              {invalidAge && (
                <small className="input-warning">
                  الحقل مطلوب ويجب ان يكون العمر اكبر من 11 واقل من 100 سنه
                </small>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4 order-2">
            <div className="input-container">
              <label htmlFor="phoneNumber">رقم الهاتف</label>
              <InputText
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleChange(e)}
                aria-describedby="username-help"
                placeholder="ادخل رقم الهاتف"
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4 order-2">
            <div className="input-container">
              <label htmlFor="address">مكان الاقامه</label>
              <InputText
                id="address"
                value={formData.address}
                onChange={(e) => handleChange(e)}
                aria-describedby="username-help"
                placeholder="ادخل مكان الاقامه"
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4 order-2">
            <div className="input-container">
              <label htmlFor="password">كلمة المرور</label>
              <span className="star">*</span>
              <Password
                toggleMask
                feedback={false}
                id="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                  setInvalidPassword(
                    !e.target.value.trim() ||
                      !passwordRegex.test(e.target.value)
                  );
                }}
                invalid={invalidPassword}
                inputStyle={{ paddingRight: "2rem", lineHeight: "unset" }}
                placeholder="ادخل كلمة المرور الجديده"
              />
              {invalidPassword && (
                <small className="input-warning">
                  يجب ان تحتوى كلمة المرور على حرف صغير وحرف كبير و ارقام ولا
                  يقل طول كلمة المرور عن 6 احرف
                </small>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 my-4 order-2">
            <div className="input-container">
              <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
              <span className="star">*</span>
              <Password
                toggleMask
                id="confirmPassword"
                value={formData.confirmPassword}
                inputStyle={{ paddingRight: "2rem", lineHeight: "unset" }}
                onChange={(e) => {
                  var newConfirm = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: newConfirm,
                  }));
                  setPasswordIsNotEqualConfirmPassword(
                    formData.password !== newConfirm
                  );
                }}
                feedback={false}
                aria-describedby="confirm-password-help"
                invalid={passwordIsNotEqualConfirmPassword}
                placeholder="تأكيد كلمة المرور"
              />
              {passwordIsNotEqualConfirmPassword && (
                <small className="input-warning d-block">
                  كلمة المرور وتأكيد كلمة المرور غير متطابقين
                </small>
              )}
            </div>
          </div>
        </div>
      </AppPagesCard>
      <div className="d-flex justify-content-end mt-2">
        <Button
          label="حفظ"
          className="btn-reuse"
          onClick={() => {
            handleSubmit();
          }}
        />
      </div>
      <AppLoadingSpinner isLoading={isPending} />
    </>
  );
}

export default UserProfileForm;
