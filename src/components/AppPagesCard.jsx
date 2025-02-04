function AppPagesCard({ type, title, children }) {
  return (
    <>
      <div className="pages-card  mt-4">
        <div className="d-flex justify-content-between align-content-center">
          <span className="card-title ">{title}</span>
          <div></div>
        </div>
        <div className="card-container">
          {children}
        </div>
      </div>
    </>
  );
}

export default AppPagesCard;
