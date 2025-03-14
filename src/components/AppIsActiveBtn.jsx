import trueIcon from "../assets/icons/true-icon.svg";
import PropTypes from 'prop-types';
function AppIsActiveBtn({text}) {
  return (
    <>
      <div className="is-active-btn d-flex justify-content-center">
        <div className=" true-icon">
          <img src={trueIcon} alt="icon" />
        </div>
        <div className="btn-text">
          {text}
        </div>
    </div>
    </>
   );
}
AppIsActiveBtn.propTypes={
  text: PropTypes.string.isRequired
}
export default AppIsActiveBtn;