import { Accordion, AccordionTab } from "primereact/accordion";
import "../assets/css/app-accordion.css";
import PropTypes from "prop-types";
function AppAccordion({ children }) {
  return (
    <>
      <div className="search">
        <Accordion>
          <AccordionTab
            header="بحث و تصفيه"
            pt={{ headerAction: { className: "search-icon" } }}
          >
            {children}
          </AccordionTab>
        </Accordion>
      </div>
    </>
  );
}
AppAccordion.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppAccordion;
