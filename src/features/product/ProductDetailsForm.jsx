import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "./services/getProduct";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import AppPagesCard from "../../components/AppPagesCard";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { InputText } from "primereact/inputtext";
import { deleteProduct } from "./services/deleteProduct";
import { getStoresForProduct } from "./services/getStoresForProduct";
import ProductDetailsTable from "./ProductDetailsTable";
function ProductDetailsForm() {
  const { id } = useParams();
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["getProduct", id],
    queryFn: () => getProduct(id),
  });
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const handlePageChange = (event) => {
      setPageNumber(event.page + 1);
      setPageSize(event.rows);
  };
    const { data: stores, isFetching: storesIsLoading, error: storesError, isError: storesIsError } = useQuery({
      queryKey: ["getProductsForStore", id,pageNumber, pageSize],
      queryFn: () => getStoresForProduct(id, pageNumber, pageSize),
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
    if (storesIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: storesError.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [data, error, isError, storesIsError, storesError, toast]);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم حذف المنتج بنجاح",
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
    },
  });
  return (
    <>
      <AppPagesCard
        title="تفاصيل المنتج"
        type="details"
        editRoute={`/product/edit/${id}`}
        deleteFunc={() => {
          mutate(id);
        }}
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
        <ProductDetailsTable
          data={stores?.data || []}
          isLoading={storesIsLoading}
          pageNumber={pageNumber}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          total={stores?.total || 0}
          title="المخازن المتوفر بها المنتج"
        />
      </AppPagesCard>
      <AppLoadingSpinner isLoading={isFetching || isPending} />
    </>
  );
}

export default ProductDetailsForm;
