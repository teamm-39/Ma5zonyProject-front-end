import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AppAccordion from "../../components/AppAccordion";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "../../assets/css/supplierFilter.css";
import { Button } from "primereact/button";
function SupplierFilter({ onFilter }) {
  const [filterValues, setFilterValues] = useState({
    name: "",
    age: "",
    address: "",
    numOfDeal: "",
    isReliable: "",
    phoneNum: "",
    email: "",
  });
  const handleInputChange = (e, field) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  const validValues =
    filterValues.name != "" ||
    filterValues.age != ""||
    filterValues.address != "" ||
    filterValues.numOfDeal != "" ||
    filterValues.isReliable !== "" ||
    filterValues.phoneNum != "" ||
    filterValues.email != "";
  useEffect(() => {
    if (!validValues) {
      onFilter(filterValues);
    }
  }, [filterValues, validValues, onFilter]);
  return (
    <>
      <div className="mt-4 supplier-filter">
        <AppAccordion>
          <div className="row">
            <div className="form-group col-12 col-md-4">
              <label htmlFor="name">اسم المورد</label>
              <input
                type="text"
                id="name"
                value={filterValues.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="age">عمر المورد</label>
              <InputText
                keyfilter="int"
                id="age"
                value={filterValues.age}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleInputChange(e, "age");
                }}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="address">مكان المورد</label>
              <input
                type="text"
                id="address"
                value={filterValues.address}
                onChange={(e) => handleInputChange(e, "address")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="email">البريد الالكترونى</label>
              <input
                type="text"
                id="email"
                value={filterValues.email}
                onChange={(e) => handleInputChange(e, "email")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="phoneNum">رقم الهاتف</label>
              <input
                type="text"
                id="phoneNum"
                value={filterValues.phoneNum}
                onChange={(e) => handleInputChange(e, "phoneNum")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="numOfDeal">عدد مرات التعامل</label>
              <InputText
                keyfilter="int"
                id="numOfDeal"
                value={filterValues.numOfDeal}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleInputChange(e, "numOfDeal");
                }}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="isReliable">هل المورد موثوق</label>
              <Dropdown
                options={[
                  { label: "--", value: "" },
                  { label: "نعم", value: true },
                  { label: "لا", value: false },
                ]}
                optionLabel="label"
                optionValue="value"
                id="isReliable"
                value={filterValues.isReliable}
                onChange={(e) => handleInputChange(e, "isReliable")}
                className="w-full mt-1"
                placeholder="--"
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
                    name: "",
                    age: "",
                    address: "",
                    numOfDeal: "",
                    isReliable: "",
                    phoneNum: "",
                    email: "",
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
SupplierFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
export default SupplierFilter;
