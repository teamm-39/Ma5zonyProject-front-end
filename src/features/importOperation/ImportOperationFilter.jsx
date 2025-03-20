import { Button } from "primereact/button";
import AppAccordion from "../../components/AppAccordion";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

function ImportOperationFilter({onFilter}) {
  const [filterValues, setFilterValues] = useState({
    userName: "",
    supplierName: "",
    date: null,
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
    filterValues.date != null ||
    filterValues.supplierName != "";
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
              <label htmlFor="supplierName">اسم المورد</label>
              <input
                type="text"
                id="supplierName"
                value={filterValues.supplierName}
                onChange={(e) => handleInputChange(e, "supplierName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="date">من يوم</label>
              <Calendar
                id="date"
                maxDate={new Date()}
                value={filterValues.date}
                onChange={(e) => handleInputChange(e, "date")}
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
                    supplierName: "",
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
ImportOperationFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default ImportOperationFilter;
