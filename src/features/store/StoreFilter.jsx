import { Button } from "primereact/button";
import AppAccordion from "../../components/AppAccordion";

function StoreFilter() {
  return (
    <>
      <div className="mt-4">
        <AppAccordion>
          <div className="form row">
            <div className="form-group col-12 col-md-4">
              <label htmlFor="storeName">اسم المخزن</label>
              <input type="text" id="storeName" className="form-control" />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="storeLocation">المديه</label>
              <input type="text" id="storeLocation" className="form-control" />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="storeManager">الدوله</label>
              <input type="text" id="storeManager" className="form-control" />
            </div>
            <div className="accordion-footer d-flex justify-content-end gap-3 mt-4">
              <Button
                label="حذف"
                severity="danger"
                text
                raised
                className="btn-reuse"
              />
              <Button
                label="بحث"
                severity="Primary"
                raised
                className="btn-reuse"
              />
            </div>
          </div>
        </AppAccordion>
      </div>
    </>
  );
}

export default StoreFilter;
