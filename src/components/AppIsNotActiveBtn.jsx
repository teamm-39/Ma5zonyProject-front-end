import falseIcon from "../assets/icons/false-icon.svg";
import PropTypes from 'prop-types';
function AppIsNotActiveBtn({text}) {
  return (
    <>
      <div className="is-not-active-btn d-flex justify-content-center">
        <div className=" true-icon">
          <img src={falseIcon} alt="icon" />
        </div>
        <div className="btn-text">
          {text}
        </div>
    </div>
    </>
   );
}
AppIsNotActiveBtn.propTypes={
  text: PropTypes.string.isRequired
}
export default AppIsNotActiveBtn;