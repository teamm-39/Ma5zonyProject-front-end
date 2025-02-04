import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import detailsIcon from "../assets/icons/details-icon.svg";
import editIcon from "../assets/icons/edit-icon.svg";
import deleteIcon from "../assets/icons/delete-icon.svg";

function AppTableActions({ rowData, details, edit, onDelete }) {
  return (
    <div className="d-flex table-icon-body justify-content-center gap-2">
      <Link className="table-actions" to={`${details}/${rowData.id}`}>
        <img src={detailsIcon} width="12" height="12" alt="details" />
      </Link>
      <Link className="table-actions" to={`${edit}/${rowData.id}`}>
        <img src={editIcon} width="12" height="12" alt="edit" />
      </Link>
      <button className="table-actions" onClick={() => onDelete(rowData.id)}>
        <img src={deleteIcon} width="12" height="12" alt="delete" />
      </button>
    </div>
  );
}

AppTableActions.propTypes = {
  rowData: PropTypes.object.isRequired,
  details: PropTypes.string.isRequired,
  edit: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AppTableActions;
