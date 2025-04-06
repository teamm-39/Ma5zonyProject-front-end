import { Column } from "primereact/column";
import AppAditionalTable from "../../components/AppAdditionalTable";
import PropTypes from "prop-types";

function ProductDetailsTable({
  data,
  isLoading,
  pageNumber,
  pageSize,
  onPageChange,
  total,
  title,
}) {
  return (
    <>
      <div className="border rounded-2 py-4 px-2">
        <h6>
          {title}:{total}
        </h6>
        <AppAditionalTable
          total={total}
          data={data || []}
          pageNumber={pageNumber}
          pageSize={pageSize}
          onPageChange={onPageChange}
          isLoading={isLoading}
          pagination={true}
        >
          <Column header="#" field="storeId" />
          <Column header="اسم المخزن" field="name" />
          <Column header="الدوله" field="country" />
          <Column header="المدينه" field="city" />
          <Column
            header="كمية المنتج"
            field="productQuantity"
          />
        </AppAditionalTable>
      </div>
    </>
  );
}
ProductDetailsTable.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number,
  title: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default ProductDetailsTable;
