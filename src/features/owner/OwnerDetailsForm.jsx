import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import getOwner from "./services/getOwner";
import { useContext, useEffect } from "react";
import { ToastContext } from "../../App";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import AppPagesCard from "../../components/AppPagesCard";
import blankProfile from "../../assets/imgs/blank-profile.png";
import { InputText } from "primereact/inputtext";
function OwnerDetailsForm() {
  const { id } = useParams();
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["getOwner", id],
    queryFn: () => getOwner(id),
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
  }, [isError, error, toast]);
  return (
    <>
      <AppPagesCard
        title="تفاصيل المالك"
        type="details"
        editRoute={`/owner/edit/${id}`}
        deleteFunc={() => {
          console.log("hi");
        }}
      >
        <div className="row">
          <div className="col-md-6 col-12 order-md-1 order-0 align-content-center">
            <div className="input-container">
              <div className="d-flex justify-content-center">
                {data?.data?.imgUrl == null || data?.data?.imgUrl == "" ? (
                  <img
                    alt="profile preview"
                    className="profile-preview"
                    src={blankProfile}
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                ) : (
                  <img
                    alt="profile preview"
                    className="profile-preview"
                    src={import.meta.env.VITE_PROFILE_IMGS + data.data.imgUrl}
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                    onError={(e) => {
                      e.target.src = blankProfile;
                      toast.current.show({
                        severity: "error",
                        summary: "فشل",
                        detail: "حدث خطأ اثناء الحصول على الصوره",
                        life: 3000,
                      });
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 order-md-0 order-1">
            <div className="input-container mb-3">
              <label htmlFor="name">اسم المالك</label>
              <InputText
                id="name"
                disabled
                className="input-disabled"
                value={data?.data?.name || ""}
              />
            </div>
            <div className="input-container mb-3">
            <label htmlFor="userName">اسم المستخدم</label>
              <InputText
                id="userName"
                disabled
                className="input-disabled"
                value={data?.data?.userName || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 order-md-2 order-2">
            <div className="input-container mb-3">
            <label htmlFor="email">البريد الالكترونى</label>
            <InputText
                id="email"
                disabled
                className="input-disabled"
                value={data?.data?.email || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 order-md-2 order-2">
            <div className="input-container mb-3">
            <label htmlFor="age">عمر المالك</label>
            <InputText
                id="age"
                disabled
                className="input-disabled"
                value={data?.data?.age || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 order-md-2 order-2">
            <div className="input-container my-3">
            <label htmlFor="phoneNumber">رقم الهاتف</label>
            <InputText
                id="phoneNumber"
                disabled
                className="input-disabled"
                value={data?.data?.phoneNumber || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 order-md-2 order-2">
            <div className="input-container my-3">
            <label htmlFor="address">مكان الاقامه</label>
            <InputText
                id="address"
                disabled
                className="input-disabled"
                value={data?.data?.address || ""}
              />
            </div>
          </div>
        </div>
        <AppLoadingSpinner isLoading={isFetching} />
      </AppPagesCard>
    </>
  );
}

export default OwnerDetailsForm;
