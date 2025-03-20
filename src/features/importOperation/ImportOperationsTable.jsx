import { useEffect, useState } from "react";
import { useContext } from "react";
import { ToastContext } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { getImportOperations } from "./services/getImportOperations";
import AppTable from "../../components/AppTable";
import { Column } from "primereact/column";
import AppTableActions from "../../components/AppTableActions";
import tableIcon from "../../assets/icons/table-icon.svg";
import PropTypes from "prop-types";

function ImportOperationsTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: [
      "getImportOperations",
      pageNumber,
      pageSize,
      filterValues.userName,
      filterValues.supplierName,
      filterValues.date,
    ],
    queryFn: () => getImportOperations(pageSize, pageNumber, filterValues),
  });
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [error, toast, isError]);
  return (
    <>
      <AppTable
        title="عمليات الاستيراد"
        isLoading={isFetching}
        onPageChange={handlePageChange}
        pageNumber={pageNumber}
        pageSize={pageSize}
        data={data?.data}
        total={data?.total}
        addUrl="/import/new"
      >
        <Column header="#" field="operationId" />
        <Column header="اسم المستخدم" field="userName" />
        <Column header="اسم المورد" field="supplierName" />
        <Column header="اجمالى السعر" field="totalPrice" />
        <Column
          header="وقت العملية"
          body={(rowData) => {
            const date = new Date(rowData.dateTime);
            return date.toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            });
          }}
        />
        <Column
          header="تاريخ العملية"
          body={(rowData) => {
            const date = new Date(rowData.dateTime);
            return date.toLocaleDateString("ar-EG");
          }}
        />
        <Column
          header={<img src={tableIcon} alt="table icon"></img>}
          style={{ width: "8rem" }}
          body={(rowData) => (
            <AppTableActions
              rowData={rowData}
              details={`/import/details/${rowData.operationId}`}
              edit={`/import/edit/${rowData.operationId}`}
              onDelete={() => console.log(data)}
            />
          )}
        />
      </AppTable>
    </>
  );
}
ImportOperationsTable.propTypes = {
  filterValues: PropTypes.shape({
    userName: PropTypes.string,
    supplierName: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  }).isRequired,
};
export default ImportOperationsTable;
