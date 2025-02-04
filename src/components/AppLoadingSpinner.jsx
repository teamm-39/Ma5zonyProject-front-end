import { ProgressSpinner } from 'primereact/progressspinner';
import PropTypes from "prop-types";
function AppLoadingSpinner({isLoading}) {
  return (
    <>
      {isLoading && (
        <div className='loading-spiner'>
          <ProgressSpinner />
        </div>
      )}
    </>
  );
};
AppLoadingSpinner.propTypes = {
  isLoading:PropTypes.bool.isRequired
}

export default AppLoadingSpinner;
