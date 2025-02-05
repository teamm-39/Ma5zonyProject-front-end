import { Button } from "primereact/button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function AppPagesCard({ type, title, children, editRoute, deleteFunc }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="pages-card  mt-4">
        <div className="d-flex justify-content-between align-content-center">
          <span className="card-title ">{title}</span>
          {type == "details" && (
            <div className="ms-1">
              <div className="d-flex gap-2">
                <Button
                  label="تعديل"
                  severity="Primary"
                  raised
                  text
                  onClick={()=>navigate(editRoute)}
                  className="btn-reuse bg-white"
                />
                <Button
                  label="حذف"
                  severity="danger"
                  text
                  raised
                  onClick={()=>deleteFunc()}
                  className="btn-reuse bg-white"
                />
              </div>
            </div>
          )}
        </div>
        <div className="card-container">{children}</div>
      </div>
    </>
  );
}

AppPagesCard.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  editRoute: PropTypes.string,
  deleteFunc: PropTypes.func,
};

export default AppPagesCard;
