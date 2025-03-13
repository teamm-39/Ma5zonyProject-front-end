import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContext } from "../../App";
import { getProduct } from "./services/getProduct";
import { useMutation, useQuery } from "@tanstack/react-query";
import AppPagesCard from "../../components/AppPagesCard";
import { InputText } from "primereact/inputtext";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { Button } from "primereact/button";
import { editProduct } from "./services/editProduct";

function ProductEditForm() {
  const { id } = useParams();
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["getProduct", id],
    queryFn: () => getProduct(id),
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
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          minLimit: "",
        }));
        setInvalidMinLimit(true);
        return;
      }

      const numValue = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        minLimit: value,
      }));
      setInvalidMinLimit(value === "" || isNaN(numValue) || numValue <= 0);
    }
  };
  useEffect(() => {
    if (data) {
      setFormData({
        productId:id,
        name: data.data.name || "",
        purchasePrice: data.data.purchasePrice || "",
        sellingPrice: data.data.sellingPrice || "",
        minLimit: data.data.minLimit || "",
      });
    }
  }, [data,id]);
  const navigate = useNavigate();
  const { mutate,isPending } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم تعديل المنتج بنجاح",
        life: 3000,
      });
      navigate("/product");
    },
    onError: (error) => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  })
  return (
    <>
      <AppPagesCard title="تعديل المنتج">
        <div className="row">
          <div className="col-md-6 col-12">
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
                <small className="input-warning">هذا الحقل مطلوب</small>
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
          <div className="col-12 col-md-6 my-4">
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
          <div className="col-12 col-md-6 my-4">
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
      <AppLoadingSpinner isLoading={isFetching||isPending} />
    </>
  );
}

export default ProductEditForm;
