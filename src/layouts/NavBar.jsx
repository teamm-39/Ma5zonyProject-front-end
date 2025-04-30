import "../assets/css/navbar.css";
import baner from '../assets/imgs/baner/login-buner.png';
function NavBar() {
  return (
    <div className="nav-container">
      <nav className="navbar navbar-expand-lg" style={{height:"66px"}}>
        <div className="d-flex justify-content-end w-100">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-end align" id="navbarNavAltMarkup">
            <div className="navbar-nav border-end pe-2 border-2 ps-3">
              <div className="d-flex profile-box gap-2 align-items-center">
                <img src={baner} alt="profile pic" width={50} />
                <div className="profile-content d-flex flex-column">
                  <h6 className="m-0 p-0">احمد على</h6>
                  <span>ادمن</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
