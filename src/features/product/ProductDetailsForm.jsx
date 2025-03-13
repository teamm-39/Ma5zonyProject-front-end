import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "./services/getProduct";
import { useContext, useEffect } from "react";
import { ToastContext } from "../../App";
import AppPagesCard from "../../components/AppPagesCard";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { InputText } from "primereact/inputtext";

function ProductDetailsForm() {
  const { id } = useParams();
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["getProduct", id],
    queryFn: () => getProduct(id),
  });
  const toast = useContext(ToastContext);
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [data, error, isError, toast]);
  return (
    <>
      <AppPagesCard
        title="تفاصيل المنتج"
        type="details"
        editRoute={`/product/edit/${id}`}
        deleteFunc={() => {}}
      >
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="input-container">
              <label htmlFor="name">اسم المنتج</label>
              <InputText
                id="name"
                disabled
                className="input-disabled"
                value={data?.data?.name || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="input-container">
              <label htmlFor="quantity">الكميه</label>
              <InputText
                id="quantity"
                disabled
                className="input-disabled"
                value={data?.data?.quantity || "0"}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4">
            <div className="input-container">
              <label htmlFor="purchasePrice">سعر الشراء</label>
              <InputText
                id="purchasePrice"
                disabled
                className="input-disabled"
                value={data?.data?.purchasePrice || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4">
            <div className="input-container">
              <label htmlFor="sellingPrice">سعر البيع</label>
              <InputText
                id="sellingPrice"
                disabled
                className="input-disabled"
                value={data?.data?.sellingPrice || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 my-4">
            <div className="input-container">
              <label htmlFor="minLimit">الحد الادنى</label>
              <InputText
                id="minLimit"
                disabled
                className="input-disabled"
                value={data?.data?.minLimit || ""}
              />
            </div>
          </div>
        </div>
      </AppPagesCard>
      <AppLoadingSpinner isLoading={isFetching} />
    </>
  );
}

export default ProductDetailsForm;
