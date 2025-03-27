import AppAditionalTable from "../../components/AppAdditionalTable";
import PropTypes from "prop-types";
import { Column } from "primereact/column";
function ExportOperationDetailsTable({
  data,
  isLoading,
  pageNumber,
  pageSize,
  onPageChange,
  total,
  title,
}) {
  return (<>
      <div className="border rounded-2 py-4 px-2">
        <h6>{title}:{ total }</h6>
        <AppAditionalTable
          total={total}
          data={data || []}
          pageNumber={pageNumber}
          pageSize={pageSize}
          onPageChange={onPageChange}
          isLoading={isLoading}
          pagination={true}
        >
          <Column header="اسم المنتج" field="productName" />
          <Column header="سعر المنتج الواحد" field="price" />
          <Column header="الكميه" field="quantity" />
          <Column header="من مخزن" field="storeName" />
          <Column
            header="اجمالى السعر"
            body={(rowData) => {
              return rowData.quantity * rowData.price;
            }}
          />
        </AppAditionalTable>
      </div>
  </>);
}
ExportOperationDetailsTable.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number,
  title: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default ExportOperationDetailsTable;