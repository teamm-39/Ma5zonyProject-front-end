import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplier } from "./services/getSupplier";
import { ToastContext } from "../../App";
import { useContext, useEffect } from "react";
import AppPagesCard from "../../components/AppPagesCard";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { InputText } from "primereact/inputtext";
import { deleteSupplier } from "./services/deleteSupplier";
function SupplierDetailsForm() {
  const { id } = useParams();
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["getSupplier", id],
    queryFn: () => getSupplier(id),
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
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم حذف المورد بنجاح",
        life: 3000,
      });
      navigate("/supplier");
    },
    onError: (error) => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  });
  return (
    <>
      <AppPagesCard
        title="تفاصيل المورد"
        type="details"
        editRoute={`/supplier/edit/${id}`}
        deleteFunc={() => {
          mutate(id)
        }}
      >
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="input-container">
              <label htmlFor="name">اسم المورد</label>
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
              <label htmlFor="age">العمر</label>
              <InputText
                id="age"
                disabled
                className="input-disabled"
                value={data?.data?.age || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4">
            <div className="input-container">
              <label htmlFor="email">البريد الإلكتروني</label>
              <InputText
                id="email"
                disabled
                className="input-disabled"
                value={data?.data?.email || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4">
            <div className="input-container">
              <label htmlFor="address">العنوان</label>
              <InputText
                id="address"
                disabled
                className="input-disabled"
                value={data?.data?.address || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4">
            <div className="input-container">
              <label htmlFor="phoneNumber">رقم الهاتف</label>
              <InputText
                id="phoneNumber"
                disabled
                className="input-disabled"
                value={data?.data?.phoneNumber || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4">
            <div className="input-container">
              <label htmlFor="numOfDeal">عدد الصفقات</label>
              <InputText
                id="numOfDeal"
                disabled
                className="input-disabled"
                value={data?.data?.numOfDeal !== undefined && data?.data?.numOfDeal !== null ? String(data?.data?.numOfDeal) : ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 my-4">
            <div className="input-container">
              <label htmlFor="isReliable">هل المورد موثوق؟</label>
              <InputText
                id="isReliable"
                disabled
                className="input-disabled"
                value={data?.data?.isReliable? "نعم" : "لا"}
              />
            </div>
          </div>
        </div>
      </AppPagesCard>
      <AppLoadingSpinner isLoading={isFetching || isPending} />
    </>
  );
}

export default SupplierDetailsForm;
