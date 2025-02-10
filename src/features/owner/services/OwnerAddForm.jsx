import { InputText } from "primereact/inputtext";
import AppPagesCard from "../../../components/AppPagesCard";
import { useContext, useState } from "react";
import blankUpload from "../../../assets/imgs/blank-upload-img.svg"; // Add blank profile image
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import  {ToastContext}  from "../../../App";
import { useMutation } from "@tanstack/react-query";
import {addOwner} from "../services/addOwner";
import { useNavigate } from "react-router-dom";
import AppLoadingSpinner from "../../../components/AppLoadingSpinner";

function OwnerAddForm() {
  const [imagePreview, setImagePreview] = useState(blankUpload);
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

  const isValidData = () => {
    let isValid = true;
    if (!formData.name.trim()) {
      isValid = false;
      setInvalidName(true);
    }
    if (!formData.userName.trim()) {
      isValid = false;
      setInvalidUserName(true);
    }
    if (!formData.age || formData <= 0) {
      isValid = false;
      setInvalidAge(true);
    }
    if (!formData.email.trim()) {
      isValid = false;
      setInvalidEmail(true);
    }
    if (!formData.password.trim()) {
      isValid = false;
      setInvalidPassword(true);
    }
    if (formData.password !== formData.confirmPassword || !passwordRegex.test(formData.password)) {
      isValid = false;
      setPasswordIsNotEqualConfirmPassword(true);
    }
    return isValid;
  };
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const { mutate,isPending } = useMutation({
    mutationFn: addOwner,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تمت اضافة المالك بنجاح",
        life: 3000,
      });
      navigate("/owner");
      setFormData({
        name: "",
        userName: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        confirmPassword: "",
        age: null,
        img: null,
      })
    },
    onError: (e) => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: e.message||"حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  })
  const handleSubmit = () => {
    if (!isValidData()) {
      return
    }
    mutate(formData,toast);
  };
  return (
    <>
      <AppPagesCard title="اضافة مالك">
        <div className="row">
          <div className="col-md-6 col-12 align-content-center order-md-1 order-0">
            <div className="input-container">
              <div className="text-center">
                {imagePreview == blankUpload ? (
                  <img
                    src={imagePreview}
                    alt="profile preview"
                    className="profile-preview"
                    style={{
                      width: "160px",
                      height: "160px",
                      cursor: "pointer",
                    }}
                    onClick={() => document.getElementById("image").click()}
                  />
                ) : (
                  <img
                    src={imagePreview}
                    alt="profile preview"
                    className="profile-preview"
                    style={{
                      width: "160px",
                      height: "160px",
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                    onClick={() => document.getElementById("image").click()}
                  />
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
              <label htmlFor="name">اسم المالك</label>
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
                  setInvalidUserName(!e.target.value.trim());
                }}
                aria-describedby="username-help"
                className={invalidUserName ? "p-invalid" : ""}
                placeholder="ادخل اسم المستخدم"
              />
              {invalidUserName && (
                <small className="input-warning">هذا الحقل مطلوب</small>
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
                  setInvalidEmail(!e.target.value.trim());
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
              <label htmlFor="age">عمر المالك</label>
              <span className="star">*</span>
              <InputNumber
                id="age"
                value={formData.age}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, age: e.value }));
                  setInvalidAge(!e.value || e.value <= 0);
                }}
                aria-describedby="username-help"
                className={invalidAge ? "p-invalid" : ""}
                placeholder="ادخل العمر"
              />
              {invalidAge && (
                <small className="input-warning">
                  هذا الحقل مطلوب ويجب ان يكون العمر اكبر من الصفر
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
                  setInvalidPassword(!e.target.value.trim()||!passwordRegex.test(e.target.value));
                }}
                aria-describedby="password-help"
                invalid={invalidPassword}
                inputStyle={{ paddingRight: "2rem", lineHeight: "unset" }}
                placeholder="ادخل كلمة المرور"
              />
              {invalidPassword && (
                <small className="input-warning">
                  يجب ان تحتوى كلمة المرور على حرف صغير وحرف
                  كبير و ارقام ولا يقل طول كلمة المرور عن 6 احرف
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

export default OwnerAddForm;
