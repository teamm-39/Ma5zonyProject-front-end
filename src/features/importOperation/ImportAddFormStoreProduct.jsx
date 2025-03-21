import PropTypes from "prop-types";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import AppAditionalTable from "../../components/AppAdditionalTable";
import tableIcon from "../../assets/icons/table-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";

function ImportAddFormStoreProduct({ title, children, items, onDelete }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = items.reduce((acc, element) => acc + (element.price * element.quantity), 0);
    setTotalPrice(total);
  }, [items]);
  return (
    <>
      <div className="border rounded-2 py-4 px-2">
        <h6>{title}</h6>
        {children}
        <AppAditionalTable data={items}>
          <Column
            header="#"
            body={(rowData, options) => options.rowIndex + 1}
          />
          <Column header="اسم المنتج" field="productName" />
          <Column header="سعر المنتج الواحد" field="price" />
          <Column header="الكميه" field="quantity" />
          <Column header="الى مخزن" field="storeName" />
          <Column
            header="اجمالى السعر"
            body={(rowData) => {
              return rowData.quantity * rowData.price;
            }}
          />
          <Column
            header={<img src={tableIcon} alt="table icon"></img>}
            body={(rowData,o) =>
              <button className="table-actions mx-auto" onClick={() => onDelete(o.rowIndex)}>
                <img src={deleteIcon} width="12" height="12" alt="delete" />
              </button>
            }
          />
        </AppAditionalTable>
        <hr />
        <div className="d-flex justify-content-between">
          <div>الاجمالى: {totalPrice}</div>
        </div>
      </div>
    </>
  );
}
ImportAddFormStoreProduct.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default ImportAddFormStoreProduct;
