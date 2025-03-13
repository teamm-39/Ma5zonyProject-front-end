import { useEffect, useState } from "react";
import AppAccordion from "../../components/AppAccordion";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import PropTypes from "prop-types";

function ProductFilter({onFilter}) {
  const [filterValues, setFilterValues] = useState({
    name: "",
    sellingPrice: "",
    purchasePrice: "",
  });
  const handleInputChange = (e, field) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  const validValues =
    filterValues.name != "" ||
    filterValues.sellingPrice != "" ||
    filterValues.purchasePrice != "";
  useEffect(() => {
    if (!validValues) {
      onFilter(filterValues);
    }
  }, [filterValues, validValues, onFilter]);
  return (
    <>
      <div className="mt-4">
        <AppAccordion>
          <div className="row">
            <div className="form-group col-12 col-md-4">
              <label htmlFor="name">اسم المنتج</label>
              <input
                type="text"
                id="name"
                value={filterValues.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="purchasePrice">سعر الشراء</label>
              <InputText
                id="purchasePrice"
                min={1}
                value={filterValues.purchasePrice}
                onChange={(e) => {
                  if (e.target.value === "0" || e.target.value === "-" || isNaN(e.target.value)) return;
                  handleInputChange(e, "purchasePrice");
                }}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="sellingPrice">سعر البيع</label>
              <InputText
                id="sellingPrice"
                value={filterValues.sellingPrice}
                onChange={(e) => {
                    if (e.target.value === "0" || e.target.value === "-" || isNaN(e.target.value)) return;
                  handleInputChange(e, "sellingPrice");
                }}
                className="form-control"
              />
            </div>
            <div className="accordion-footer d-flex justify-content-end gap-3 mt-4">
              <Button
                label="حذف"
                severity="danger"
                text
                raised
                className="btn-reuse"
                disabled={!validValues}
                onClick={() => {
                  setFilterValues({
                    name: "",
                    sellingPrice: "",
                    purchasePrice: "",
                  });
                }}
              />
              <Button
                label="بحث"
                severity="Primary"
                raised
                className="btn-reuse"
                disabled={!validValues}
                onClick={() => {
                  onFilter(filterValues);
                }}
              />
            </div>
          </div>
        </AppAccordion>
      </div>
    </>
  );
}
ProductFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
export default ProductFilter;
