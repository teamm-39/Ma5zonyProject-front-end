import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import AppAccordion from "../../components/AppAccordion";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";

function ProductLogFilter({ onFilter }) {
  const [filterValues, setFilterValues] = useState({
    userName: "",
    operationType: "",
    dateTime: "",
    newProductName: "",
    oldProductName: "",
    oldSellingPrice: "",
    newSellingPrice: "",
    oldPurchasePrice: "",
    newPurchasePrice: "",
  });
  const handleInputChange = (e, field) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  const validValues =
    filterValues.userName != "" ||
    filterValues.newProductName != "" ||
    filterValues.oldProductName != "" ||
    filterValues.dateTime ||
    filterValues.operationType ||
    filterValues.oldSellingPrice != "" ||
    filterValues.newSellingPrice != "" ||
    filterValues.oldPurchasePrice != "" ||
    filterValues.newPurchasePrice != "";
  useEffect(() => {
    if (!validValues) onFilter(filterValues);
  }, [filterValues, validValues, onFilter]);
  return (
    <>
      <div className="mt-4 supplier-filter">
        <AppAccordion>
          <div className="row">
            <div className="form-group col-12 col-md-4">
              <label htmlFor="userName">اسم المستخدم</label>
              <input
                type="text"
                id="userName"
                value={filterValues.userName}
                onChange={(e) => handleInputChange(e, "userName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="oldProductName">اسم المنتج القديم</label>
              <input
                type="text"
                id="oldProductName"
                value={filterValues.oldProductName}
                onChange={(e) => handleInputChange(e, "oldProductName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="newProductName">اسم المنتج الجديد</label>
              <input
                type="text"
                id="newProductName"
                value={filterValues.newProductName}
                onChange={(e) => handleInputChange(e, "newProductName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="oldPurchasePrice">سعر الشراء القديم</label>
              <InputText
                id="oldPurchasePrice"
                min={1}
                value={filterValues.oldPurchasePrice}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleInputChange(e, "oldPurchasePrice");
                }}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="newPurchasePrice">سعر الشراء الجديد</label>
              <InputText
                id="newPurchasePrice"
                min={1}
                value={filterValues.newPurchasePrice}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleInputChange(e, "newPurchasePrice");
                }}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="oldSellingPrice">سعر البيع القديم</label>
              <InputText
                id="oldSellingPrice"
                min={1}
                value={filterValues.oldSellingPrice}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleInputChange(e, "oldSellingPrice");
                }}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="newSellingPrice">سعر البيع الجديد</label>
              <InputText
                id="newSellingPrice"
                min={1}
                value={filterValues.newSellingPrice}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleInputChange(e, "newSellingPrice");
                }}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="dateTime">من يوم</label>
              <Calendar
                id="dateTime"
                maxDate={new Date()}
                value={filterValues.dateTime}
                onChange={(e) => handleInputChange(e, "dateTime")}
                className="form-control "
                inputClassName="calneder-input-style"
                panelClassName="calender-style"
                dateFormat="yy/mm/dd"
                showButtonBar
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="operationType">نوع العمليه</label>
              <Dropdown
                options={[
                  { label: "الكل", value: null },
                  { label: "اضافه", value: 3 },
                  { label: "تعديل", value: 4 },
                  { label: "حذف", value: 5 },
                ]}
                panelClassName="dropdown-supplier"
                optionLabel="label"
                optionValue="value"
                id="isRelioperationTypeable"
                value={filterValues.operationType}
                onChange={(e) => handleInputChange(e, "operationType")}
                className="w-full "
                placeholder="الكل"
                checkmark={true}
                style={{ padding: "0.213rem 0 0.213rem 0.75rem " }}
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
                    userName: "",
                    operationType: "",
                    dateTime: "",
                    newProductName: "",
                    oldProductName: "",
                    oldSellingPrice: "",
                    newSellingPrice: "",
                    oldPurchasePrice: "",
                    newPurchasePrice: "",
                  });
                }}
              />
              <Button
                label="بحث"
                severity="Primary"
                raised
                disabled={!validValues}
                className="btn-reuse"
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
ProductLogFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
export default ProductLogFilter;
