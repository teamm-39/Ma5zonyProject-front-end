import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContext } from "../../App";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSupplier } from "./services/getSupplier";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import AppPagesCard from "../../components/AppPagesCard";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { editSupplier } from "./services/editSupplier";

function SupplierEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["getSupplier", id],
    queryFn: () => getSupplier(id),
  });
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [error, isError, data, toast]);
  const [formData, setFormData] = useState({
    customerSupplierId: id,
    name: "",
    email: "",
    age: "",
    address: "",
    phoneNumber: "",
    isReliable: false,
  });
  useEffect(() => {
    if (data) {
      setFormData({
        customerSupplierId: id,
        name: data?.data.name || "",
        email: data?.data.email || "",
        age: data?.data.age || "",
        address: data?.data.address || "",
        phoneNumber: data?.data.phoneNumber || "",
        isReliable: data?.data.isReliable || false,
      });
    }
  }, [data, id]);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidAge, setInvalidAge] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [invalidIsReliable, setInvalidIsReliable] = useState(false);

  const handleChange = (e, field) => {
    let value = field === "isReliable" ? e.target.value : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    switch (field) {
      case "name":
        setInvalidName(value.length < 1);
        break;
      case "age":
        setInvalidAge(
          value === "" || isNaN(parseInt(value)) || parseInt(value) <= 17
        );
        break;
      case "email":
        setInvalidEmail(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        break;
      case "address":
        setInvalidAddress(value.length < 1);
        break;
      case "phoneNumber":
        setInvalidPhoneNumber(!/^\d{11}$/.test(value));
        break;
      case "isReliable":
        setInvalidIsReliable(typeof value !== "boolean");
        break;
      default:
        break;
    }
  };
  const isFormEmpty = Object.values(formData).some((value) => value === "");
  const { mutate, isPending } = useMutation({
    mutationFn: editSupplier,
    onSuccess: () => {
      navigate("/supplier");
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم تعديل المورد بنجاح",
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
  return (
    <>
      <AppPagesCard title="تعديل مورد">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="input-container">
              <label htmlFor="name">اسم المورد</label>
              <span className="star">*</span>
              <InputText
                id="name"
                type="text"
                value={formData.name}
                className={invalidName ? "p-invalid" : ""}
                onChange={(e) => handleChange(e, "name")}
                placeholder="ادخل اسم المورد"
              />
              {invalidName && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container">
              <label htmlFor="age">العمر</label>
              <span className="star">*</span>
              <InputText
                id="age"
                keyfilter={"int"}
                value={formData.age}
                className={invalidAge ? "p-invalid" : ""}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleChange(e, "age");
                }}
                placeholder="ادخل العمر"
              />
              {invalidAge && (
                <small className="input-warning">
                  هذا الحقل مطلوب ويجب أن يكون عمر المورد اكبر من 17 عام
                </small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 mt-4">
            <div className="input-container">
              <label htmlFor="email">البريد الإلكتروني</label>
              <span className="star">*</span>
              <InputText
                id="email"
                type="text"
                value={formData.email}
                className={invalidEmail ? "p-invalid" : ""}
                onChange={(e) => handleChange(e, "email")}
                placeholder="ادخل البريد الإلكتروني"
              />
              {invalidEmail && (
                <small className="input-warning">
                  هذا الحقل مطلوب ويجب أن يكون بريد إلكتروني صحيح
                </small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 mt-4">
            <div className="input-container">
              <label htmlFor="address">العنوان</label>
              <span className="star">*</span>
              <InputText
                id="address"
                type="text"
                value={formData.address}
                className={invalidAddress ? "p-invalid" : ""}
                onChange={(e) => handleChange(e, "address")}
                placeholder="ادخل العنوان"
              />
              {invalidAddress && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 my-4">
            <div className="input-container">
              <label htmlFor="phoneNumber">رقم الهاتف</label>
              <span className="star">*</span>
              <InputText
                id="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                className={invalidPhoneNumber ? "p-invalid" : ""}
                onChange={(e) => handleChange(e, "phoneNumber")}
                placeholder="ادخل رقم الهاتف"
              />
              {invalidPhoneNumber && (
                <small className="input-warning">
                  هذا الحقل مطلوب ويجب أن يكون رقم هاتف صحيح
                </small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 my-4">
            <div className="input-container">
              <label htmlFor="isReliable">هل المورد موثوق؟</label>
              <span className="star">*</span>
              <div
                className="input-disabled rounded-3 py-1 px-1 d-flex align-content-center gap-2"
                style={{ backgroundColor: "#cacaca82" }}
              >
                <InputSwitch
                  id="isReliable"
                  checked={Boolean(formData.isReliable)}
                  className={invalidIsReliable ? "p-invalid" : ""}
                  style={{ width: "50px" }}
                  onChange={(e) => handleChange(e, "isReliable")}
                />
                {formData.isReliable == true ? (
                  <small
                    style={{ color: "#333333" }}
                    className="align-content-center"
                  >
                    نعم
                  </small>
                ) : (
                  <small
                    style={{ color: "#333333" }}
                    className="align-content-center"
                  >
                    لا
                  </small>
                )}
              </div>
              {invalidIsReliable && (
                <small className="input-warning">
                  هذا الحقل مطلوب ويجب أن يكون true أو false
                </small>
              )}
            </div>
          </div>
        </div>
      </AppPagesCard>
      <div className="d-flex justify-content-end mt-2">
        <Button
          label="حفظ"
          disabled={
            isFormEmpty ||
            invalidName ||
            invalidAge ||
            invalidEmail ||
            invalidAddress ||
            invalidPhoneNumber ||
            invalidIsReliable
          }
          className="btn-reuse"
          onClick={() => {
            mutate(formData);
          }}
        />
      </div>
      <AppLoadingSpinner isLoading={isFetching || isPending} />
    </>
  );
}

export default SupplierEditForm;
