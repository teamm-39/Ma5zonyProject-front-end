import { DataTable } from "primereact/datatable";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import PropTypes from "prop-types";

function AppTable({ title, total, children, data }) {
  return (
    <>
      <div className="taple-header d-flex justify-content-between align-items-center mt-4">
        <div className="taple-header-info d-flex gap-1">
          <span className="table-title">{title}</span>
          <span className="table-total">{total}</span>
        </div>
        <div className="header-btn">
          <Link to="">
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
          paginatorTemplate="RowsPerPageDropdown PrevPageLink   PageLinks NextPageLink "
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginator
          className=""
        >
          {children}
        </DataTable>
      </div>
    </>
  );
}
AppTable.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  data: PropTypes.array.isRequired,
};

export default AppTable;
