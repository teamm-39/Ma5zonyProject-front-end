import { useEffect, useState } from "react";
import AppAccordion from "../../components/AppAccordion";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import PropTypes from "prop-types";

function StoreLogFilter({ onFilter }) {
  const [filterValues, setFilterValues] = useState({
    userName: "",
    operationType: null,
    fromDateTime: "",
    toDateTime: "",
    newStoreName: "",
    oldStoreName: "",
  });
  const handleInputChange = (e, field) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  const validValues =
    filterValues.userName != "" ||
    filterValues.newStoreName != "" ||
    filterValues.oldStoreName != "" ||
    filterValues.fromDateTime ||
    filterValues.toDateTime ||
    filterValues.operationType != null;
  useEffect(() => {
    if (!validValues)
      onFilter(filterValues);
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
              <label htmlFor="oldStoreName">اسم المخزن القديم</label>
              <input
                type="text"
                id="oldStoreName"
                value={filterValues.oldStoreName}
                onChange={(e) => handleInputChange(e, "oldStoreName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="newStoreName">اسم المخزن الجديد</label>
              <input
                type="text"
                id="newStoreName"
                value={filterValues.newStoreName}
                onChange={(e) => handleInputChange(e, "newStoreName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
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
                    fromDateTime: "",
                    toDateTime: "",
                    operationType: null,
                    newStoreName: "",
                    oldStoreName: "",
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
StoreLogFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
export default StoreLogFilter;
