import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContext } from "../../App";
import { getExportOperation } from "./services/getExportOperation";
import { getProductsAndStoresForOperationDetails } from "./services/getProductsAndStoreForOperationDetails";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteExportOperation } from "./services/deleteExportOperation";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { InputText } from "primereact/inputtext";
import AppPagesCard from "../../components/AppPagesCard";
import ExportOperationDetailsTable from "./ExportOperationDetailsTable";
function ExportOperationDetailsForm() {
  const { id } = useParams();
  const toast = useContext(ToastContext);
  const {
    data: operation,
    isFetching: operationIsLoading,
    isError: operationIsError,
    error: operationError,
  } = useQuery({
    queryKey: ["getExportOperation", id],
    queryFn: () => getExportOperation(id),
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
    queryKey: ["getProductsStoresForOperation", id, pageNumber, pageSize],
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
  const navigate=useNavigate()
  const { mutate,isPending } = useMutation({
    mutationKey: ["deleteExportOperation"],
    mutationFn: deleteExportOperation,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم حذف العمليه بنجاح",
        life: 3000,
      });
      navigate("/export")
    },
    onError: (e) => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: e.meesage || "حدث خطأ غير متوقع",
        life: 3000,
      });
    },
  });
  return (<>
  <AppPagesCard
          title="تفاصيل العمليه"
          editRoute={`/export/edit/${id}`}
          deleteFunc={() => {
            mutate(id)
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
                <label htmlFor="customerName">اسم العميل</label>
                <InputText
                  id="customerName"
                  disabled
                  className="input-disabled"
                  value={operation?.data?.customerName || ""}
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
          <ExportOperationDetailsTable
            total={productsStores?.total}
            title="المنتجات"
            data={productsStores?.data||[]}
            isLoading={productsStoresIsLoading}
            onPageChange={handlePageChange}
            pageNumber={pageNumber}
            pageSize={pageSize}
          />
        </AppPagesCard>
        <AppLoadingSpinner isLoading={operationIsLoading||isPending}/>
  </>);
}

export default ExportOperationDetailsForm;
