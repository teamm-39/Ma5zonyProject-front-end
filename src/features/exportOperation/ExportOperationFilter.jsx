import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AppAccordion from "../../components/AppAccordion";

function ExportOperationFilter({ onFilter }) {
  const [filterValues, setFilterValues] = useState({
    userName: "",
    customerName: "",
    fromDateTime: "",
    toDateTime: "",
  });
  const handleInputChange = (e, field) => {
    let value = e.target.value;
    setFilterValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };
  const validValues =
    filterValues.userName != "" ||
    filterValues.fromDateTime ||
    filterValues.toDateTime ||
    filterValues.customerName != "";
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
              <label htmlFor="supplierName">اسم العميل</label>
              <input
                type="text"
                id="supplierName"
                value={filterValues.customerName}
                onChange={(e) => handleInputChange(e, "customerName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="fromDateTime">من يوم</label>
              <Calendar
                id="dateTime"
                maxDate={new Date()}
                value={filterValues.fromDateTime}
                onChange={(e) => handleInputChange(e, "fromDateTime")}
                className="form-control "
                inputClassName="calneder-input-style"
                panelClassName="calender-style"
                dateFormat="yy/mm/dd"
                showButtonBar
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="toDateTime">الى يوم</label>
              <Calendar
                id="dateTime"
                maxDate={new Date()}
                value={filterValues.toDateTime}
                onChange={(e) => handleInputChange(e, "toDateTime")}
                className="form-control "
                inputClassName="calneder-input-style"
                panelClassName="calender-style"
                dateFormat="yy/mm/dd"
                showButtonBar
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
                    customerName: "",
                    date: null,
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
ExportOperationFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
export default ExportOperationFilter;
