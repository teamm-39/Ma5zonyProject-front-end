import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ToastContext } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { getProductLogs } from "./services/getProductLogs";
import UseCreatePdf from "../../components/UseCreatePdf";
import { getProductLogsWithoutPagination } from "./services/getProductLogsWithoutPagintaion";
import { productLogTableToPdf } from "./services/productLogTableToPdf";
import AppAditionalTable from "../../components/AppAdditionalTable";
import { Column } from "primereact/column";

function ProductLogsTable({ filterValues }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (event) => {
    setPageNumber(event.page + 1);
    setPageSize(event.rows);
  };
  const toast = useContext(ToastContext);
  const { data, isFetching, error, isError } = useQuery({
    queryKey: [
      "ProductLogs",
      filterValues.userName,
      filterValues.operationType,
      filterValues.fromDateTime,
      filterValues.toDateTime,
      filterValues.newProductName,
      filterValues.oldProductName,
      filterValues.oldSellingPrice,
      filterValues.newSellingPrice,
      filterValues.oldPurchasePrice,
      filterValues.newPurchasePrice,
      pageNumber,
      pageSize,
    ],
    queryFn: () => getProductLogs(pageNumber, pageSize, filterValues),
  });

  const [pdfTable, setPdfTable] = useState([]);
  const {
    data: dataWithoutPagination,
    isFetching: dataIsFetshing,
    error: dataError,
    isError: dataIsError,
  } = useQuery({
    queryKey: ["productLogsWithoutPagination", filterValues],
    queryFn: () => getProductLogsWithoutPagination(filterValues),
  });

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
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
  }, [isError, error, toast, dataIsError, dataError?.message]);

  useEffect(() => {
    if (dataWithoutPagination) {
      setPdfTable(productLogTableToPdf(dataWithoutPagination, filterValues));
    }
  }, [dataWithoutPagination, filterValues]);

  return (
    <>
      <div className="logs-table mt-4">
        <div className="taple-header d-flex justify-content-between align-items-center mt-4">
          <div className="taple-header-info d-flex gap-1">
            <span className="table-title">تقارير المنتجات</span>
            <span className="table-total">{data?.total}</span>
          </div>
          <div className="header-btn">
            <UseCreatePdf
              pdfName={"productLogs"}
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
          <Column className="text-center" field="productLogId" header="#" />
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
            header="اسم المنتج"
            body={(rowData) => (
              <>
                <span>قبل: {rowData.oldName}</span>
                <br />
                <span>بعد: {rowData.newName}</span>
              </>
            )}
          />
          <Column
            header="سعر الشراء"
            body={(rowData) => (
              <>
                <span>
                  قبل: {rowData.oldPurchasePrice === 0 ? "-" : rowData.oldPurchasePrice}
                </span>
                <br />
                <span>
                  بعد: {rowData.newPurchasePrice === 0 ? "-" : rowData.newPurchasePrice}
                </span>
              </>
            )}
          />
          <Column
            header="سعر البيع"
            body={(rowData) => (
              <>
                <span>
                  قبل: {rowData.oldSellingPrice === 0 ? "-" : rowData.oldSellingPrice}
                </span>
                <br />
                <span>
                  بعد: {rowData.newSellingPrice === 0 ? "-" : rowData.newSellingPrice}
                </span>
              </>
            )}
          />
          <Column
            header="الحد الادنى"
            body={(rowData) => (
              <>
                <span>
                  قبل: {rowData.oldMinLimit === 0 ? "-" : rowData.oldMinLimit}
                </span>
                <br />
                <span>
                  بعد: {rowData.newMinLimit === 0 ? "-" : rowData.newMinLimit}
                </span>
              </>
            )}
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

ProductLogsTable.propTypes = {
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
    newProductName: PropTypes.string,
    oldProductName: PropTypes.string,
    oldSellingPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    newSellingPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    oldPurchasePrice: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    newPurchasePrice: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }),
};

export default ProductLogsTable;
