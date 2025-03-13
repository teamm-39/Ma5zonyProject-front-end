import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { Column } from "primereact/column";
import PropTypes from "prop-types";
import { getProducts } from "./services/getProducts";
import AppTable from "../../components/AppTable";
import tableIcon from "../../assets/icons/table-icon.svg";
import AppTableActions from "../../components/AppTableActions";
function ProductsTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching, error } = useQuery({
    queryKey: [
      "products",
      pageNumber,
      pageSize,
      filterValues.name,
      filterValues.sellingPrice,
      filterValues.purchasePrice,
    ],
    queryFn: () => getProducts(pageNumber, pageSize, filterValues),
  });
  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [error, toast]);
  return (
    <>
      <AppTable
        title={"المنتجات"}
        pageNumber={pageNumber}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        data={data?.data}
        total={data?.total}
        isLoading={isFetching}
        addUrl="/product/new"
      >
        <Column header="#" field="productId" />
        <Column header="اسم المنتج" field="name" />
        <Column header="سعر الشراء" field="purchasePrice" />
        <Column header="سعر البيع" field="sellingPrice" />
        <Column
          header="الحد الأدنى"
          field="minLimit"
          body={(rowData) => `${rowData.minLimit} وحدة`}
        />
        <Column header="الكمية" field="quantity" />
        <Column
          header={<img src={tableIcon} alt="table icon"></img>}
          style={{ width: "8rem" }}
          body={(rowData) => (
            <AppTableActions
              rowData={rowData}
              details={`/product/details/${rowData.storeId}`}
              edit={`/product/edit/${rowData.storeId}`}
              onDelete={() => console.log("delete")}
            />
          )}
        />
      </AppTable>
    </>
  );
}
ProductsTable.propTypes = {
  filterValues: PropTypes.shape({
    name: PropTypes.string,
    sellingPrice: PropTypes.string || PropTypes.number || null,
    purchasePrice: PropTypes.string || PropTypes.number || null,
  }).isRequired,
};
export default ProductsTable;
