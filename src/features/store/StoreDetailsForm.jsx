import { useMutation, useQuery } from "@tanstack/react-query";
import AppPagesCard from "../../components/AppPagesCard";
import { InputText } from "primereact/inputtext";
import getStore from "./services/getStore";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { deleteStore } from "./services/deleteStore";
import StoreDetailsTable from "./StoreDetailsTable";
import { getProductsForeStore } from "./services/getProductsForStore";

function StoreAddForm() {
  const { id } = useParams();
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["getStore", id],
    queryFn: () => getStore(id),
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const { data: products, isFetching: productsIsLoading, error: productsError, isError: productsIsError } = useQuery({
    queryKey: ["getProductsForStore", id,pageNumber, pageSize],
    queryFn: () => getProductsForeStore(id, pageNumber, pageSize),
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
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
    if (productsIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: productsError?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [isError, productsIsError, error, productsError, toast]);
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
        <StoreDetailsTable
          data={products?.data || []}
          isLoading={productsIsLoading}
          pageNumber={pageNumber}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          total={products?.total || 0}
          title="المنتجات المتوفره فى المخزن"
        />
        <AppLoadingSpinner isLoading={isFetching || isPending} />
      </AppPagesCard>
    </>
  );
}

export default StoreAddForm;
