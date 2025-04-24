import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import { getExportOperations } from "./services/getExportOperations";
import PropTypes from "prop-types";
import AppTable from "../../components/AppTable";
import { Column } from "primereact/column";
import AppTableActions from "../../components/AppTableActions";
import tableIcon from "../../assets/icons/table-icon.svg";
import { deleteExportOperation } from "./services/deleteExportOperation";

function ExportOperationsTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: [
      "getExportOperations",
      pageNumber,
      pageSize,
      filterValues.userName,
      filterValues.customerName,
      filterValues.date,
    ],
    queryFn: () => getExportOperations(pageSize, pageNumber, filterValues),
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
  const queryClient = useQueryClient();
  const { mutate,isPending } = useMutation({
    mutationKey: ["deleteImportOperation"],
    mutationFn: deleteExportOperation,
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم حذف العمليه بنجاح",
        life: 3000,
      });
      queryClient.invalidateQueries(["getExportOperations"]);
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
  return (
    <>
      <AppTable
        title="عمليات البيع"
        isLoading={isFetching || isPending}
        onPageChange={handlePageChange}
        pageNumber={pageNumber}
        pageSize={pageSize}
        data={data?.data}
        total={data?.total}
        addUrl="/export/new"
      >
        <Column header="#" field="operationId" />
        <Column header="اسم المستخدم" field="userName" />
        <Column header="اسم العميل" field="customerName" />
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
              details={`/export/details/${rowData.operationId}`}
              edit={`/export/edit/${rowData.operationId}`}
              onDelete={() => mutate(rowData.operationId)}
            />
          )}
        />
      </AppTable>
    </>
  );
}
ExportOperationsTable.propTypes = {
  filterValues: PropTypes.shape({
    userName: PropTypes.string,
    customerName: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  }).isRequired,
};
export default ExportOperationsTable;
