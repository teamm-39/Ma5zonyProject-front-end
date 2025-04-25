import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import { getSupplierLogs } from "./services/getSupplierLos";
import PropTypes from "prop-types";
import { getSupplierLogsWithoutPagination } from "./services/getSuppliersWithoutPagination";
import { supplierLogTableToPdf } from "./services/supplierLogTableToPdf";
import { Column } from "primereact/column";
import AppAditionalTable from "../../components/AppAdditionalTable";
import UseCreatePdf from "../../components/UseCreatePdf";

function SupplierLogsTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: [
      "supplierLogs",
      filterValues.userName,
      filterValues.newName,
      filterValues.oldName,
      filterValues.fromDateTime,
      filterValues.toDateTime,
      filterValues.operationType,
      filterValues.oldEmail,
      filterValues.newEmail,
      filterValues.oldPhoneNumber,
      filterValues.newPhoneNumber,
      pageNumber,
      pageSize,
    ],
    queryFn: () => getSupplierLogs(pageNumber, pageSize, filterValues),
  });
  const [pdfTable, setPdfTable] = useState([]);
  const {
    data: dataWithoutPagination,
    isFetching: dataIsFetshing,
    error: dataError,
    isError: dataIsError,
  } = useQuery({
    queryKey: ["supplierLogsWithoutPagination", filterValues],
    queryFn: () => getSupplierLogsWithoutPagination( filterValues),
  });
    useEffect(() => {
      if (isError) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.meesage || "حدث خطأ غير متوقع",
          life: 3000,
        });
      }
      if (dataIsError) {
        toast.current.show({
          severity: "error",
          summary: "فشل",
          detail: dataError.meesage || "حدث خطأ غير متوقع",
          life: 3000,
        });
      }
    }, [isError, dataIsError, error, dataError, toast]);
    useEffect(() => {
      if (dataWithoutPagination) {
        setPdfTable(supplierLogTableToPdf(dataWithoutPagination, filterValues));
      }
    }, [dataWithoutPagination, filterValues]);
  return (
    <>
<div className="logs-table mt-4">
        <div className="taple-header d-flex justify-content-between align-items-center mt-4">
          <div className="taple-header-info d-flex gap-1">
            <span className="table-title">تقارير الموردين</span>
            <span className="table-total">{data?.total}</span>
          </div>
          <div className="header-btn">
            <UseCreatePdf
              pdfName={"supplierLogs"}
              table={pdfTable}
              isLoading={dataIsFetshing}
            />
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
          <Column
            className="text-center"
            field="customerSupplierLogId"
            header="#"
          />
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
          <Column
            header="اسم العميل"
            body={(rowData) => {
              return (
                <>
                  <span>قبل:{rowData.oldName}</span>
                  <br />
                  <span>بعد:{rowData.newName}</span>
                </>
              );
            }}
          />
          <Column
            header="عمر المورد"
            body={(rowData) => {
              return (
                <>
                  <span>قبل:{rowData.oldAge == 0 ? "-" : rowData.oldAge}</span>
                  <br />
                  <span>بعد:{rowData.newAge == 0 ? "-" : rowData.newAge}</span>
                </>
              );
            }}
          />
          <Column
            header="البريد الالكترونى"
            body={(rowData) => {
              return (
                <>
                  <span>قبل:{rowData.oldEmail}</span>
                  <br />
                  <span>بعد:{rowData.newEmail}</span>
                </>
              );
            }}
          />
          <Column
            header="مكان المورد"
            body={(rowData) => {
              return (
                <>
                  <span>قبل:{rowData.oldAddress}</span>
                  <br />
                  <span>بعد:{rowData.newAddress}</span>
                </>
              );
            }}
          />
          <Column
            header="رقم الهاتف"
            body={(rowData) => {
              return (
                <>
                  <span>قبل:{rowData.oldPhoneNumber}</span>
                  <br />
                  <span>بعد:{rowData.newPhoneNumber}</span>
                </>
              );
            }}
          />
          <Column
            header="موثوق به"
            body={(rowData) => {
              return (
                <>
                  <span>
                    قبل:
                    {rowData.oldIsReliable === true ? (
                      "نعم"
                    ) : rowData.oldIsReliable === false ? (
                      "لا"
                    ) : null}
                  </span>
                  <br />
                  <span>
                    بعد:
                    {rowData.newIsReliable === true ? (
                      "نعم"
                    ) : rowData.newIsReliable === false ? (
                      "لا"
                    ) : null}
                  </span>
                </>
              );
            }}
          />
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
        </AppAditionalTable>
      </div>
    </>
   );
}
SupplierLogsTable.propTypes = {
  filterValues: PropTypes.shape({
    userName: PropTypes.string,
    newName: PropTypes.string,
    oldName: PropTypes.string,
    fromDateTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    toDateTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    operationType: PropTypes.string,
    oldEmail: PropTypes.string,
    newEmail: PropTypes.string,
    oldPhoneNumber: PropTypes.string,
    newPhoneNumber: PropTypes.string,
  }).isRequired,
};
export default SupplierLogsTable;