import { DataTable } from "primereact/datatable";
import PropTypes from "prop-types";
import AppLoadingSpinner from "./AppLoadingSpinner";

function AppAditionalTable({
  data,
  children,
  pagination,
  pageSize,
  pageNumber,
  onPageChange,
  total,
  isLoading
}) {
  return (
    <>
      {pagination ? (
        <div className="table-container mt-0">
          <DataTable
            value={data}
            paginatorTemplate="RowsPerPageDropdown  PrevPageLink PageLinks NextPageLink "
            rows={pageSize}
            onPage={onPageChange}
            first={(pageNumber - 1) * pageSize}
            rowsPerPageOptions={[5, 10, 25, 50]}
            paginator
            totalRecords={total}
            lazy
            className="position-relative"
            emptyMessage={"لا يوجد بيانات"}
          >
            {children}
          </DataTable>
          <AppLoadingSpinner isLoading={isLoading} />
        </div>
      ) : (
        <div className="table-container mt-4">
          <DataTable
            value={data}
            className="position-relative"
            emptyMessage="لم يتم اضافة بيانات"
          >
            {children}
          </DataTable>
        </div>
      )}
    </>
  );
}
AppAditionalTable.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node,
  pagination: PropTypes.bool,
  isLoading: PropTypes.bool,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default AppAditionalTable;
