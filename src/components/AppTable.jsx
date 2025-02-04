import { DataTable } from "primereact/datatable";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import PropTypes from "prop-types";
import AppLoadingSpinner from "./AppLoadingSpinner";
function AppTable({
  title,
  data,
  total,
  onPageChange,
  children,
  pageSize,
  pageNumber,
  isLoading,
  addUrl
}) {
  return (
    <>
      <div className="taple-header d-flex justify-content-between align-items-center mt-4">
        <div className="taple-header-info d-flex gap-1">
          <span className="table-title">{title}</span>
          <span className="table-total">{total}</span>
        </div>
        <div className="header-btn">
          <Link to={addUrl}>
            <Button
              label="اضافة جديد"
              severity="Primary"
              raised
              className="btn-reuse rounded-3"
            />
          </Link>
        </div>
      </div>
      <div className="table-container">
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
        >
          {children}
        </DataTable>
          <AppLoadingSpinner isLoading={isLoading} />
      </div>
    </>
  );
}
AppTable.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
  children: PropTypes.node.isRequired,
  data: PropTypes.array,
  pageSize: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addUrl:PropTypes.string.isRequired
};

export default AppTable;
