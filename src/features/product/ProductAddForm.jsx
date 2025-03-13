import { useContext, useState } from "react";
import AppPagesCard from "../../components/AppPagesCard";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "./services/addProduct";
import { ToastContext } from "../../App";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { useNavigate } from "react-router-dom";

function ProductAddForm() {
  const [formData, setFormData] = useState({
    name: "",
    purchasePrice: "",
    sellingPrice: "",
    minLimit: "",
  });
  const [invalidName, setInvalidName] = useState(false);
  const [invalidSellingPrice, setInvalidSellingPrice] = useState(false);
  const [invalidPurchasePrice, setInvalidPurchasePrice] = useState(false);
  const [invalidMinLimit, setInvalidMinLimit] = useState(false);
  const handleChange = (e, field) => {
    const value = e.target.value.trim();

    if (field === "name") {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setInvalidName(e.target.value.length < 1);
    }

    if (field === "purchasePrice" || field === "sellingPrice") {
      // Check if starts with 0
      if (value.startsWith("0")) return;

      // Allow only numbers and one decimal point
      if (!/^\d*\.?\d*$/.test(value)) return;

      // Prevent multiple decimal points
      if (value.split(".").length > 2) return;

      // Parse the value to check if it's greater than 0
      const numValue = parseFloat(value);
      if (numValue <= 0) return;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (field === "purchasePrice") {
        setInvalidPurchasePrice(
          value === "" || isNaN(numValue) || numValue <= 0
        );
      } else {
        setInvalidSellingPrice(
          value === "" || isNaN(numValue) || numValue <= 0
        );
      }
    }

    if (field === "minLimit") {
      // Only allow positive integers for minLimit
      if (value !== "" && !/^[1-9]\d*$/.test(value)) return;

      const numValue = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        minLimit: value,
      }));
      setInvalidMinLimit(value === "" || isNaN(numValue) || numValue <= 0);
    }
  };
  const navigate = useNavigate();
  const toast = useContext(ToastContext);
  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تمت اضافة المنتج بنجاح",
        life: 3000,
      });
      navigate("/product");
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
      <AppPagesCard title="اضافة منتج">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="input-container">
              <label htmlFor="name">اسم المنتج</label>
              <span className="star">*</span>
              <InputText
                id="name"
                type="text"
                value={formData.name}
                className={invalidName ? "p-invalid" : ""}
                onChange={(e) => handleChange(e, "name")}
                placeholder="ادخل اسم النتج"
              />
              {invalidName && (
                <small className="input-warning">هذا الحقل مطلو</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container">
              <label htmlFor="purchasePrice">سعر الشراء</label>
              <span className="star">*</span>
              <InputText
                id="purchasePrice"
                value={formData.purchasePrice}
                className={invalidPurchasePrice ? "p-invalid" : ""}
                onChange={(e) => handleChange(e, "purchasePrice")}
                placeholder="ادخل سعر الشراء"
              />
              {invalidPurchasePrice && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container">
              <label htmlFor="sellingPrice">سعر البيع</label>
              <span className="star">*</span>
              <InputText
                id="sellingPrice"
                value={formData.sellingPrice}
                className={invalidSellingPrice ? "p-invalid" : ""}
                onChange={(e) => handleChange(e, "sellingPrice")}
                placeholder="ادخل سعر البيع"
              />
              {invalidSellingPrice && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="input-container">
              <label htmlFor="minLimit">الحد الادنى</label>
              <span className="star">*</span>
              <InputText
                id="minLimit"
                value={formData.minLimit}
                className={invalidMinLimit ? "p-invalid" : ""}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleChange(e, "minLimit");
                }}
                placeholder="ادخل الحد الادنى"
              />
              {invalidMinLimit && (
                <small className="input-warning">هذا الحقل مطلوب</small>
              )}
            </div>
          </div>
        </div>
      </AppPagesCard>
      <div className="d-flex justify-content-end mt-2">
        <Button
          label="حفظ"
          disabled={
            invalidMinLimit ||
            invalidName ||
            invalidPurchasePrice ||
            invalidSellingPrice
          }
          className="btn-reuse"
          onClick={() => {
            mutate(formData);
          }}
        />
      </div>
      <AppLoadingSpinner isLoading={isPending} />
    </>
  );
}

export default ProductAddForm;
