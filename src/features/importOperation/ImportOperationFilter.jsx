import { Button } from "primereact/button";
import AppAccordion from "../../components/AppAccordion";

function ImportOperationFilter() {
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
                // value={filterValues.name}
                // onChange={(e) => handleInputChange(e, "name")}
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
                // disabled={!validValues}
                // onClick={() => {
                //     setFilterValues({
                //     name: "",
                //     age: "",
                //     address: "",
                //     numOfDeal: "",
                //     isReliable: "",
                //     phoneNum: "",
                //     email: "",
                //     });
                // }}
              />
              <Button
                label="بحث"
                severity="Primary"
                raised
                className="btn-reuse"
                // disabled={!validValues}
                // onClick={() => {
                //   onFilter(filterValues);
                // }}
              />
            </div>
          </div>
        </AppAccordion>
      </div>
    </>
  );
}

export default ImportOperationFilter;
