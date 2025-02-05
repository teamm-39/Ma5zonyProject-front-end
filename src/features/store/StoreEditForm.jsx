import { InputText } from "primereact/inputtext";
import AppPagesCard from "../../components/AppPagesCard";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import getStore from "./services/getStore";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContext } from "../../App";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import editStore from "./services/editStore";
function StoreEditForm() {
  const { id } = useParams();
  const toast = useContext(ToastContext);
  const { data, isFetching } = useQuery({
    queryKey: ["getStore", id],
    queryFn: () => getStore(id, toast),
  });
  const [invalidName, setInvalidName] = useState(false);
  const [invalidCountry, setInvalidCountry] = useState(false);
  const [invalidCity, setInvalidCity] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
  });
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.data.name || "",
        country: data.data.country || "",
        city: data.data.city || "",
      });
    }
  }, [data]);
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
  const {mutate,isPending} = useMutation({
    mutationFn: editStore,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم تعديل المخزن بنجاح",
        life: 3000,
      });
      navigate("/store");
    }
  });
  return (
    <>
      <AppPagesCard title="تعديل المخزن">
        <div className="row">
          <div className="col-md-6 col-12">
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
          <div className="col-md-6 col-12">
            <div className="input-container">
              <label htmlFor="country">الدوله</label>
              <span className="star">*</span>
              <InputText
                id="country"
                value={formData.country}
                onChange={(e) => handleChange(e, "country")}
                aria-describedby="username-help"
                className={invalidCountry ? "p-invalid" : ""}
                placeholder="ادخل الدوله"
              />
              {invalidCountry && (
                <small className="input-warning">
                  لا يجب ترك هذا الحقل فارغا
                </small>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 my-4">
            <div className="input-container">
              <label htmlFor="city">المدينه</label>
              <span className="star">*</span>
              <InputText
                id="city"
                value={formData.city}
                onChange={(e) => handleChange(e, "city")}
                aria-describedby="username-help"
                className={invalidCity ? "p-invalid" : ""}
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
            mutate({
              storeId: id,
              name: formData.name,
              country: formData.country,
              city:formData.city
            },toast);
          }}
        />
      </div>
      <AppLoadingSpinner isLoading={isFetching||isPending} />
    </>
  );
}

export default StoreEditForm;
