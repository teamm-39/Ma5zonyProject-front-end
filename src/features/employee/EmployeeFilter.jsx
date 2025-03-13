import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import AppAccordion from "../../components/AppAccordion";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function EmployeeFilter({onFilter}) {
    const [filterValues, setFilterValues] = useState({
      name: "",
      userName: "",
      age: "",
      phone: "",
      address: "",
    });

    const handleInputChange = (e, field) => {
      setFilterValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
    const validValues =
      filterValues.name != "" ||
      filterValues.userName != "" ||
      filterValues.age != "" ||
      filterValues.phone != "" ||
      filterValues.address != "";
    useEffect(() => {
      if (!validValues) {
      onFilter(filterValues)
    }
  },[filterValues])
  return (
    <>
          <div className="mt-4">
            <AppAccordion>
              <div className="from row">
                <div className="form-group col-12 col-md-4">
                  <label htmlFor="name">اسم الموظف</label>
                  <input
                    type="text"
                    id="name"
                    value={filterValues.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    className="form-control"
                  />
                </div>
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
                  <label htmlFor="age">عمر الموظف</label>
                  <InputText
                    keyfilter="int"
                    id="age"
                    value={filterValues.age}
                    onChange={(e) => {
                      if (e.target.value === "0" || e.target.value === "-" || isNaN(e.target.value)) return;
                      handleInputChange(e, "age")
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group col-12 col-md-4 mt-4">
                  <label htmlFor="phone">رقم هاتف الموظف</label>
                  <input
                    type="text"
                    id="phone"
                    value={filterValues.phone}
                    onChange={(e) => handleInputChange(e, "phone")}
                    className="form-control"
                  />
                </div>
                <div className="form-group col-12 col-md-4 mt-4">
                  <label htmlFor="address">مكان الاقامه</label>
                  <input
                    type="text"
                    id="address"
                    value={filterValues.address}
                    onChange={(e) => handleInputChange(e, "address")}
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
                      setFilterValues({name:"",userName:"",age:"",phone:"",address:"",})
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
EmployeeFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
export default EmployeeFilter;