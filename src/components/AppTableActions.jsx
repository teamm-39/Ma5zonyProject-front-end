import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import detailsIcon from "../assets/icons/details-icon.svg";
import editIcon from "../assets/icons/edit-icon.svg";
import deleteIcon from "../assets/icons/delete-icon.svg";

function AppTableActions({ details, edit, onDelete }) {
  return (
    <div className="d-flex table-icon-body justify-content-center gap-2">
      <Link className="table-actions" to={`${details}`}>
        <img src={detailsIcon} width="12" height="12" alt="details" />
      </Link>
      <Link className="table-actions" to={`${edit}`}>
        <img src={editIcon} width="12" height="12" alt="edit" />
      </Link>
      <button className="table-actions" onClick={() => onDelete()}>
        <img src={deleteIcon} width="12" height="12" alt="delete" />
      </button>
    </div>
  );
}

AppTableActions.propTypes = {
  details: PropTypes.string.isRequired,
  edit: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AppTableActions;
