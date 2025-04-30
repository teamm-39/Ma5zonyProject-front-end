import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "./services/getProducts";
import { ToastContext } from "../../App";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { Column } from "primereact/column";

function ProductsTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["productsBelowMinLimit", pageNumber, pageSize],
    queryFn: () =>
      getProducts(pageNumber, pageSize),
  });
    const toast=useContext(ToastContext)

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  },[isError,error, toast]);
  return (
    <>
      <div className="taple-header d-flex justify-content-between align-items-center mt-4">
        <div className="taple-header-info d-flex gap-1">
          <span className="table-title">منتجات يجب شرائها</span>
          <span className="table-total">{data?.total}</span>
        </div>
        <div className="header-btn">
          <Link to="import/new">
            <Button
              label="شراء الان"
              severity="Primary"
              raised
              className="btn-reuse rounded-3"
            />
          </Link>
        </div>
      </div>
      <div className="table-container">
        <DataTable
          value={data?.data}
          paginatorTemplate="RowsPerPageDropdown  PrevPageLink PageLinks NextPageLink "
          rows={pageSize}
          onPage={handlePageChange}
          first={(pageNumber - 1) * pageSize}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginator
          totalRecords={data?.total}
          lazy
          className="position-relative"
          emptyMessage={"لا توجد منتجات يجب شرائها الان"}
        >
          <Column header="#" field="productId" />
          <Column header="اسم المنتج" field="name" />
          <Column header="سعر الشراء" field="purchasePrice" />
          <Column header="سعر البيع" field="sellingPrice" />
          <Column header="الكمية المتاحة" field="quantity" />
          <Column header="الحد الادنى" field="minLimit" />
        </DataTable>
          <AppLoadingSpinner isLoading={isFetching} />
      </div>
    </>
   );
}

export default ProductsTable;