import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { ToastContext } from "../../App";
import { getSupplierLogs } from "./services/getSupplierLos";
import PropTypes from "prop-types";

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

  return (
    <>

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