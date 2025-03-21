import { DataTable } from "primereact/datatable";
import PropTypes from 'prop-types';

function AppAditionalTable({ data,children }) {
  return (
    <>
      <div className="table-container mt-4">
        <DataTable
          value={data}
          className="position-relative"
          emptyMessage="لم يتم اضافة بيانات"
        >
          {children}
        </DataTable>
      </div>
    </>
  );
}
AppAditionalTable.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node
};

export default AppAditionalTable;
