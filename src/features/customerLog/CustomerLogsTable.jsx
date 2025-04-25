import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { ToastContext } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { getCustomerLogs } from "./services/getCustomerLogs";
import UseCreatePdf from "../../components/UseCreatePdf";
import AppAditionalTable from "../../components/AppAdditionalTable";
import { Column } from "primereact/column";

function CustomerLogsTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: [
      "CustomerLogs",
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
    queryFn: () => getCustomerLogs(pageNumber, pageSize, filterValues),
  });
  const [pdfTable, setPdfTable] = useState([]);

  return (
    <>
      <div className="logs-table mt-4">
        <div className="taple-header d-flex justify-content-between align-items-center mt-4">
          <div className="taple-header-info d-flex gap-1">
            <span className="table-title">تقارير العملاء</span>
            <span className="table-total">{data?.total}</span>
          </div>
          <div className="header-btn">
            <UseCreatePdf
              pdfName={"customerLogs"}
              table={pdfTable}
              isLoading={isFetching}
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
            header="عمر العميل"
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
            header="مكان العميل"
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
CustomerLogsTable.propTypes = {
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

export default CustomerLogsTable;
