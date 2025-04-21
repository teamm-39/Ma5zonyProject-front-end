import PropTypes from "prop-types";
import AppAditionalTable from "../../components/AppAdditionalTable";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { getStoreLogs } from "./services/getStoreLogs";
import { Column } from "primereact/column";
import UseCreatePdf from "../../hooks/UseCreatePdf";
import { storeLogTableToPdf } from "./StoreLogTableToPdf";
import { getStoreLogsWithoutPagination } from "./services/getStoreLogsWithoutPagination";

function StoreLogsTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: [
      "storeLogs",
      pageNumber,
      pageSize,
      filterValues.userName,
      filterValues.operationType,
      filterValues.dateTime,
      filterValues.storeName,
    ],
    queryFn: () => getStoreLogs(pageNumber, pageSize, filterValues),
  });
  const [pdfTable, setPdfTable] = useState([]);
  const { data:dataWithoutPagination,error:dataError,isError:dataIsError } = useQuery({
    queryKey: ["storeLogsWithoutPagination", filterValues],
    queryFn: () => getStoreLogsWithoutPagination(filterValues),
  })
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
    if (dataIsError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: dataError.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [error, toast, isError, dataError?.message, dataIsError]);

  useEffect(() => {
    if (dataWithoutPagination) {
      setPdfTable(storeLogTableToPdf(dataWithoutPagination, filterValues));
    }
  }, [dataWithoutPagination, filterValues]);
  return (
    <>
      <div className="logs-table mt-4">
        <div className="taple-header d-flex justify-content-between align-items-center mt-4">
          <div className="taple-header-info d-flex gap-1">
            <span className="table-title">تقارير المخازن</span>
            <span className="table-total">{data?.total}</span>
          </div>
          <div className="header-btn">
            <UseCreatePdf pdfName={"storeLogs"} table={pdfTable} />
          </div>
        </div>
        <AppAditionalTable
          data={data?.data || []}
          isLoading={isFetching}
          onPageChange={handlePageChange}
          total={data?.total}
          pageNumber={pageNumber}
          pageSize={pageSize}
          pagination={true}
        >
          <Column className="text-center" field="storeLogId" header="#" />
          <Column field="userName" header="اسم المستخدم" />
          <Column
            header="نوع العمليه"
            body={(rowData) => {
              if (rowData.lookupOperationTypeId == 3) {
                return <span className="add-operation operation">اضافه</span>;
              } else if (rowData.lookupOperationTypeId == 5) {
                return <span className="delete-operation operation">حذف</span>;
              } else if (rowData.lookupOperationTypeId == 4) {
                return (
                  <span className="update-operation operation">تعديل</span>
                );
              }
            }}
          />
          <Column header="اسم المخزن قبل التعديل" field="oldName" />
          <Column header="الدوله قبل التعديل" field="oldCountry" />
          <Column header="المدينه قبل التعديل" field="olgCity" />
          <Column header="اسم المخزن بعد التعديل" field="newName" />
          <Column header="الدوله بعد التعديل" field="newCountry" />
          <Column header="المدينه بعد التعديل" field="newCity" />
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
          <Column field="message" header="رساله" />
        </AppAditionalTable>
      </div>
    </>
  );
}
StoreLogsTable.propTypes = {
  filterValues: PropTypes.shape({
    userName: PropTypes.string,
    operationType: PropTypes.string,
    dateTime: PropTypes.string,
    storeName: PropTypes.string,
  }).isRequired,
};
export default StoreLogsTable;
