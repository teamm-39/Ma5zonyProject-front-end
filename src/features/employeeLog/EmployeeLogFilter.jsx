import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppAccordion from "../../components/AppAccordion";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
function EmployeeLogFilter({ onFilter }) {
    const [filterValues, setFilterValues] = useState({
      userName: "",
      operationType: "",
      fromDateTime: "",
      toDateTime: "",
      oldUserName: "",
      newUserName: "",
      oldName: "",
      newName: "",
      oldAge: "",
      newAge: "",
      oldPhoneNumber: "",
      newPhoneNumber: "",
      oldAddress: "",
      newAddress: "",
    });
    const handleInputChange = (e, field) => {
      setFilterValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
    const validValues =
      filterValues.userName != "" ||
      filterValues.newUserName != "" ||
      filterValues.oldUserName != "" ||
      filterValues.fromDateTime ||
      filterValues.toDateTime ||
      filterValues.operationType ||
      filterValues.oldName != "" ||
      filterValues.newName != "" ||
      filterValues.oldAge ||
      filterValues.newAge ||
      filterValues.oldPhoneNumber != "" ||
      filterValues.newPhoneNumber != "" ||
      filterValues.oldAddress != "" ||
      filterValues.newAddress != "";
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
              <label htmlFor="oldUserName">اسم المستخدم القديم</label>
              <input
                type="text"
                id="oldUserName"
                value={filterValues.oldUserName}
                onChange={(e) => handleInputChange(e, "oldUserName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="newUserName">اسم المستخدم الجديد</label>
              <input
                type="text"
                id="newUserName"
                value={filterValues.newUserName}
                onChange={(e) => handleInputChange(e, "newUserName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="oldName">اسم الموظف القديم</label>
              <input
                type="text"
                id="oldName"
                value={filterValues.oldName}
                onChange={(e) => handleInputChange(e, "oldName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="newName">اسم الموظف الجديد</label>
              <input
                type="text"
                id="newName"
                value={filterValues.newName}
                onChange={(e) => handleInputChange(e, "newName")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="oldAge">عمر الموظف القديم</label>
              <InputText
                id="oldAge"
                min={1}
                value={filterValues.oldAge}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleInputChange(e, "oldAge");
                }}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="newAge">عمر الموظف الجديد</label>
              <InputText
                id="newAge"
                min={1}
                value={filterValues.newAge}
                onChange={(e) => {
                  if (
                    e.target.value === "0" ||
                    e.target.value === "-" ||
                    isNaN(e.target.value)
                  )
                    return;
                  handleInputChange(e, "newAge");
                }}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="oldPhoneNumber">رقم الهاتف القديم</label>
              <input
                type="text"
                id="oldPhoneNumber"
                value={filterValues.oldPhoneNumber}
                onChange={(e) => handleInputChange(e, "oldPhoneNumber")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="newPhoneNumber">رقم الهاتف الجديد</label>
              <input
                type="text"
                id="newPhoneNumber"
                value={filterValues.newPhoneNumber}
                onChange={(e) => handleInputChange(e, "newPhoneNumber")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="oldAddress">مكان الاقامه القديم</label>
              <input
                type="text"
                id="oldAddress"
                value={filterValues.oldAddress}
                onChange={(e) => handleInputChange(e, "oldAddress")}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4 mt-4">
              <label htmlFor="newAddress">مكان الاقامه الجديد</label>
              <input
                type="text"
                id="newAddress"
                value={filterValues.newAddress}
                onChange={(e) => handleInputChange(e, "newAddress")}
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
                    operationType: "",
                    fromDateTime: "",
                    toDateTime: "",
                    oldUserName: "",
                    newUserName: "",
                    oldName: "",
                    newName: "",
                    oldAge: "",
                    newAge: "",
                    oldPhoneNumber: "",
                    newPhoneNumber: "",
                    oldAddress: "",
                    newAddress: "",
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
EmployeeLogFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default EmployeeLogFilter;