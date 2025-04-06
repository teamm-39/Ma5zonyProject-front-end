import { Column } from "primereact/column";
import AppAditionalTable from "../../components/AppAdditionalTable";
import PropTypes from "prop-types";

function StoreDetailsTable({
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
        <h6>{title}:{total}</h6>
                <AppAditionalTable
                  total={total}
                  data={data || []}
                  pageNumber={pageNumber}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                  isLoading={isLoading}
                  pagination={true}
        >
                  <Column header="#" field="productId" />
                  <Column header="اسم المنتج" field="name" />
                  <Column header="سعر شراء المنج" field="purchasePrice" />
                  <Column header="سعر بيع المنتج" field="sellingPrice" />
                  <Column header="الكميه فى هذا المخزن" field="quantity" />
                  <Column header="الحد الادنى" field="minLimit" />
                </AppAditionalTable>
        </div>
    </>
   );
}
StoreDetailsTable.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number,
  title: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default StoreDetailsTable;