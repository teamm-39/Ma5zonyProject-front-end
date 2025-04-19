import PropTypes from 'prop-types';

function AppCard({ children }) {
  return (
    <>
      <div className="app-card container">
        {children}
      </div>
    </>
  );
}

AppCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppCard;
