import { Button } from "primereact/button";
import AppAccordion from "../../components/AppAccordion";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function StoreFilter({ onFilter }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const validValues = name != "" || country != "" || city != "";
  const handleSearch = () => {
    onFilter({ name, country, city });
  };
  useEffect(() => {
    if (!validValues) {
      onFilter({ name, country, city });
    }
  }, [name, country, city, onFilter, validValues]);
  return (
    <>
      <div className="mt-4">
        <AppAccordion>
          <div className="form row">
            <div className="form-group col-12 col-md-4">
              <label htmlFor="name">اسم المخزن</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="country">الدوله</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group col-12 col-md-4">
              <label htmlFor="city">المدينه</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
                  setName("");
                  setCountry("");
                  setCity("");
                }}
              />
              <Button
                label="بحث"
                severity="Primary"
                raised
                disabled={!validValues}
                className="btn-reuse"
                onClick={handleSearch}
              />
            </div>
          </div>
        </AppAccordion>
      </div>
    </>
  );
}
StoreFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default StoreFilter;
