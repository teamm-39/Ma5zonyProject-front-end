import { useParams } from "react-router-dom";
import AppPagesCard from "../../components/AppPagesCard";
import { InputText } from "primereact/inputtext";
import { useQuery } from "@tanstack/react-query";
import { getImportOperation } from "./services/getImportOperation";
import { getProductsAndStoresForOperationDetails } from "./services/getProductsAndStoresForOperationDetails";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import ImportOperationDetailsTable from "./ImportOperationDetailsTable";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";

function ImportOperationDetailsForm() {
  const { id } = useParams();
  const toast = useContext(ToastContext);
  const {
    data: operation,
    isFetching: operationIsLoading,
    isError: operationIsError,
    error: operationError,
  } = useQuery({
    queryKey: ["getImportOperation", id],
    queryFn: () => getImportOperation(id),
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const {
    data: productsStores,
    isFetching: productsStoresIsLoading,
    isError: productsStoresIsError,
    error: productsStoresError,
  } = useQuery({
    queryKey: ["getProductsStoresForOperation", id ,pageNumber,pageSize],
    queryFn: () =>
      getProductsAndStoresForOperationDetails(id, pageSize, pageNumber),
  });
  useEffect(() => {
    if (operationIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: operationError?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
    if (productsStoresIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: productsStoresError?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [
    operationError,
    operationIsError,
    toast,
    productsStoresError,
    productsStoresIsError,
  ]);
  return (
    <>
      <AppPagesCard
        title="تفاصيل العمليه"
        editRoute={`/import/edit/${id}`}
        deleteFunc={() => {
          console.log("");
        }}
        type="details"
      >
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="input-container">
              <label htmlFor="userName">اسم المستخدم</label>
              <InputText
                id="userName"
                disabled
                className="input-disabled"
                value={operation?.data?.userName || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="input-container">
              <label htmlFor="supplierName">اسم المورد</label>
              <InputText
                id="supplierName"
                disabled
                className="input-disabled"
                value={operation?.data?.supplierName || ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4">
            <div className="input-container">
              <label htmlFor="date">تاريخ العمليه</label>
              <InputText
                id="date"
                disabled
                className="input-disabled"
                value={
                  operation?.data?.dateTime
                    ? new Date(operation.data.dateTime).toLocaleDateString(
                        "ar-EG"
                      )
                    : ""
                }
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4">
            <div className="input-container">
              <label htmlFor="time">وقت العمليه</label>
              <InputText
                id="time"
                disabled
                className="input-disabled"
                value={
                  operation?.data?.dateTime
                    ? new Date(operation.data.dateTime).toLocaleTimeString(
                        "ar-EG"
                      )
                    : ""
                }
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mt-4 mb-4">
            <div className="input-container">
              <label htmlFor="totalPrice">اجمالى السعر</label>
              <InputText
                id="totalPrice"
                disabled
                className="input-disabled"
                value={operation?.data?.totalPrice || ""}
              />
            </div>
          </div>
        </div>
        <ImportOperationDetailsTable
          total={productsStores?.total}
          title="المنتجات"
          data={productsStores?.data||[]}
          isLoading={productsStoresIsLoading}
          onPageChange={handlePageChange}
          pageNumber={pageNumber}
          pageSize={pageSize}
        />
      </AppPagesCard>
      <AppLoadingSpinner isLoading={operationIsLoading}/>
    </>
  );
}

export default ImportOperationDetailsForm;
