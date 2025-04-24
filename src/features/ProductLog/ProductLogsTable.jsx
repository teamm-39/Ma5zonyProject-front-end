import { useContext, useState } from "react";
import PropTypes from "prop-types"
import { ToastContext } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { getProductLogs } from "./services/getProductLogs";
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
      filterValues.dateTime,
      filterValues.newProductName,
      filterValues.oldProductName,
      filterValues.oldSellingPrice,
      filterValues.newSellingPrice,
      filterValues.oldPurchasePrice,
      filterValues.newPurchasePrice,
      pageNumber,
      pageSize
    ],
    queryFn: () => getProductLogs(pageNumber,pageSize,filterValues)
  });

  return (
    <>

    </>
   );
}
ProductLogsTable.propTypes = {
  filterValues: PropTypes.shape({
    userName: PropTypes.string,
    operationType: PropTypes.string,
    dateTime: PropTypes.instanceOf(Date),
    newProductName: PropTypes.string,
    oldProductName: PropTypes.string,
    oldSellingPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    newSellingPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    oldPurchasePrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    newPurchasePrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};
export default ProductLogsTable;