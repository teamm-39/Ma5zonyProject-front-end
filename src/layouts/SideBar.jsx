import { Link, useLocation } from "react-router-dom";
import "../assets/css/sidebar.css";
import logo from "../assets/imgs/baner/logo.svg";
function SideBar() {
  const location = useLocation();
  return (
    <>
      <div className="sidebar">
      <Link
        className="navbar-brand"
        to="/"
      >
          <div className="navbar-brand d-flex align-items-center p-0 m-0 gap-2">
          <img src={logo} alt="logo" className="me-2" width={30} style={{ height: "50px" }} />
        <div className="brand-name text-center me- d-flex flex-column">
          <h3 className="fw-bold p-0 m-0 ">مخزون</h3>
          <span className="brand-span m-0 p-0">
            ادارة المستودعات والمخازن
          </span>
        </div>
        </div>
      </Link>
        <ul className="menu m-0">
          <li
            className={`menu-item ${location.pathname == "/" ? "active" : ""}`}
          >
            <Link to="/" className="link">
              <i className="bi bi-house-door ms-2"></i>
              لوحة التحكم
            </Link>
          </li>
          <li
            className={`menu-item ${
              location.pathname == "/store" ? "active" : ""
            }`}
          >
            <Link to="/store" className="link">
              <i className="bi bi-building ms-2"></i>
              إدارة المخازن
            </Link>
          </li>
          <li
            className={`menu-item ${
              location.pathname == "/users" ? "active" : ""
            }`}
          >
            <Link to="/users" className="link">
              <i className="bi bi-people ms-2"></i>
              إدارة المستخدمين
            </Link>
          </li>
          <li
            className={`menu-item ${
              location.pathname == "/customers" ? "active" : ""
            }`}
          >
            <Link to="/customers" className="link">
              <i className="bi bi-person-lines-fill ms-2"></i>
              إدارة العملاء
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/reports" className="link">
              <i className="bi bi-file-earmark-text ms-2"></i>
              عرض تقرير
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/suppliers" className="link w-100">
              <i className="bi bi-truck ms-2"></i>
              إدارة الموردين
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/products" className="link w-100">
              <i className="bi bi-box-seam ms-2"></i>
              إدارة المنتجات
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
