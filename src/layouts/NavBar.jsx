import "../assets/css/navbar.css";
import logo from '../assets/imgs/baner/login-logo.png';
import baner from '../assets/imgs/baner/login-buner.png';
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="nav-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center pe-3 p-0 m-0 gap-1" to="/">
            <img src={logo} alt="" width={40} style={{height:"50px"}} />
            <div className="brand-name text-center d-flex flex-column">
              <h2 className="fw-bold p-0 m-0 text-light">مخزون</h2>
              <span className="brand-span m-0 p-0 text-light">ادارة المستودعات والمخازن</span>
            </div>
          </Link>
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
          <div className="collapse navbar-collapse border-end border-2 me-4 d-flex justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav border-end pe-4 border-2 ps-3">
              <div className="d-flex profile-box gap-2 align-items-center">
                <img src={baner} alt="profile pic" width={50} />
                <div className="profile-content d-flex flex-column">
                  <h6 className="m-0 p-0 fw-bold">احمد على</h6>
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
