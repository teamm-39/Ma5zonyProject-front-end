import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../App";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import UseCreatePdf from "../../components/UseCreatePdf";
import AppAditionalTable from "../../components/AppAdditionalTable";
import { Column } from "primereact/column";
import { getEmployeeLogs } from "./services/getEmployeeLogs";
import { getEmployeeLogsWithoutPagination } from "./services/getEmployeeLogsWithoutPagination";
import { employeeLogTableToPdf } from "./services/employeeLogTableToPdf";

function EmployeeLogsTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: [
      "employeeLogs",
      filterValues.userName,
      filterValues.newName,
      filterValues.oldName,
      filterValues.fromDateTime,
      filterValues.toDateTime,
      filterValues.operationType,
      filterValues.oldPhoneNumber,
      filterValues.newPhoneNumber,
      filterValues.oldAddress,
      filterValues.newAddress,
      filterValues.oldUserName,
      filterValues.newUserName,
      filterValues.oldAge,
      filterValues.newAge,
      pageNumber,
      pageSize,
    ],
    queryFn: () => getEmployeeLogs(pageNumber, pageSize, filterValues),
  });
  const [pdfTable, setPdfTable] = useState([]);
  const {
    data: dataWithoutPagination,
    isFetching: dataIsFetshing,
    error: dataError,
    isError: dataIsError,
  } = useQuery({
    queryKey: ["employeeLogsWithoutPagination", filterValues],
    queryFn: () => getEmployeeLogsWithoutPagination(filterValues),
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
            setPdfTable(employeeLogTableToPdf(dataWithoutPagination, filterValues));
          }
        }, [dataWithoutPagination, filterValues]);
  return (
    <>
      <div className="logs-table mt-4">
        <div className="taple-header d-flex justify-content-between align-items-center mt-4">
          <div className="taple-header-info d-flex gap-1">
            <span className="table-title">تقارير الموظفين</span>
            <span className="table-total">{dataWithoutPagination?.total}</span>
          </div>
          <div className="header-btn">
            <UseCreatePdf
              pdfName={"employeeLogs"}
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
            field="applicationUserLogId"
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
            header="اسم المالك"
            style={{minWidth:"120px"}}
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
            header="اسم المستخدم للموظف"
            body={(rowData) => {
              return (
                <>
                  <span>قبل:{rowData.oldUserName}</span>
                  <br />
                  <span>بعد:{rowData.newUserName}</span>
                </>
              );
            }}
          />
          <Column
            header="عمر الموظف"
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
            header="مكان الاقامه"
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
EmployeeLogsTable.propTypes = {
  filterValues: PropTypes.shape({
    userName: PropTypes.string,
    operationType: PropTypes.string,
    fromDateTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    toDateTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    oldUserName: PropTypes.string,
    newUserName: PropTypes.string,
    newName: PropTypes.string,
    oldName: PropTypes.string,
    oldAge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    newAge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    oldPhoneNumber: PropTypes.string,
    newPhoneNumber: PropTypes.string,
    oldAddress: PropTypes.string,
    newAddress: PropTypes.string,
  }),
};
export default EmployeeLogsTable;
