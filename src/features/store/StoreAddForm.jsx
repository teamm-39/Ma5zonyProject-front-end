import AppPagesCard from "../../components/AppPagesCard";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addStore } from "./services/addStore";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { ToastContext } from "../../App";
import { useNavigate } from "react-router-dom";
function StoreAddForm() {
  const [invalidName, setInvalidName] = useState(false);
  const [invalidCountry, setInvalidCountry] = useState(false);
  const [invalidCity, setInvalidCity] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
  });
  const handleChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    if (field === "name") {
      setInvalidName(e.target.value.length < 3);
    }
    if (field === "country") {
      setInvalidCountry(e.target.value.trim().length == 0);
    }
    if (field === "city") {
      setInvalidCity(e.target.value.trim().length == 0);
    }
  };
  const navigate = useNavigate();
  const toast = useContext(ToastContext);
  const { mutate, isPending } = useMutation({
    mutationFn: addStore,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تمت اضافة المخزن بنجاح",
        life: 3000,
      });

      navigate("/store")
      formData.name = "";
      formData.country = "";
      formData.city = "";
    },
    onError: () => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: "لم يتم اضافة المخزن",
        life: 3000,
      });
    }
  });
  return (
    <>
      <AppPagesCard title="اضافة مخزن">
        <div className="row ">
          <div className="col-12 col-md-6">
            <div className="input-container">
              <label htmlFor="name">اسم المخزن</label>
              <span className="star">*</span>
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) => handleChange(e, "name")}
                aria-describedby="username-help"
                className={invalidName ? "p-invalid" : ""}
                placeholder="ادخل الاسم"
              />
              {invalidName && (
                <small className="input-warning">
                  طول الاسم يجب الا يقل عن 3 حروف
                </small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container">
              <label htmlFor="country">اسم الدوله</label>
              <span className="star">*</span>
              <InputText
                id="country"
                value={formData.country}
                onChange={(e) => handleChange(e, "country")}
                className={invalidCountry ? "p-invalid" : ""}
                aria-describedby="username-help"
                placeholder="ادخل الدوله"
              />
              {invalidCountry && (
                <small className="input-warning">
                  لا يجب ترك هذا الحقل فارغا
                </small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 my-4">
            <div className="input-container">
              <label htmlFor="city">اسم المدينه</label>
              <span className="star">*</span>
              <InputText
                id="city"
                value={formData.city}
                onChange={(e) => handleChange(e, "city")}
                className={invalidCity ? "p-invalid" : ""}
                aria-describedby="username-help"
                placeholder="ادخل المدينه"
              />
              {invalidCity && (
                <small className="input-warning">
                  لا يجب ترك هذا الحقل فارغا
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
            invalidCity ||
            invalidName ||
            invalidCountry ||
            !formData.name.trim() ||
            !formData.country.trim() ||
            !formData.city.trim()
          }
          className="btn-reuse"
          onClick={() => {
            mutate(formData,toast);
          }}
        />
      </div>
      <AppLoadingSpinner isLoading={isPending} />
    </>
  );
}

export default StoreAddForm;
