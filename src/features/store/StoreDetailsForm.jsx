import { useMutation, useQuery } from "@tanstack/react-query";
import AppPagesCard from "../../components/AppPagesCard";
import { InputText } from "primereact/inputtext";
import getStore from "./services/getStore";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ToastContext } from "../../App";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { deleteStore } from "./services/deleteStore";

function StoreAddForm() {
  const { id } = useParams();
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const { data, isFetching } = useQuery({
    queryKey: ["getStore", id],
    queryFn: () => getStore(id, toast),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: deleteStore,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم حذف المخزن بنجاح",
        life: 3000,
      });
      navigate("/store");
    },
  });
  return (
    <>
      <AppPagesCard
        title="تفاصيل المخزن"
        type="details"
        editRoute={`/store/edit/${id}`}
        deleteFunc={() => mutate(id, toast)}
      >
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="input-container">
              <label htmlFor="name">اسم المخزن</label>
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
              <label htmlFor="country">الدوله</label>
              <InputText
                id="country"
                disabled
                className="input-disabled"
                value={data?.data?.country || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 my-4">
            <div className="input-container">
              <label htmlFor="city">المدينه</label>
              <InputText
                id="city"
                disabled
                className="input-disabled"
                value={data?.data?.city || ""}
              />
            </div>
          </div>
        </div>
        <AppLoadingSpinner isLoading={isFetching || isPending} />
      </AppPagesCard>
    </>
  );
}

export default StoreAddForm;
