import { Link, useLocation } from "react-router-dom";
import "../assets/css/sidebar.css";
import logo from "../assets/imgs/baner/logo.svg";
import { Accordion, AccordionTab } from "primereact/accordion";

function SideBar() {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname.startsWith(path) ? "active" : "";
  };
  return (
    <>
      <div className="sidebar">
        <Link className="navbar-brand" to="/">
          <div className="navbar-brand d-flex align-items-center p-0 m-0 gap-2">
            <img
              src={logo}
              alt="logo"
              className="me-2"
              width={30}
              style={{ height: "50px" }}
            />
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
          <li className={`menu-item ${isActive("/store")}`}>
            <Link to="/store" className="link">
              <i className="bi bi-building ms-2"></i>
              إدارة المخازن
            </Link>
          </li>
          <li className={`accordion-sidebar`}>
            <Accordion activeIndex={isActive("/owner")=="active"?0:undefined}>
              <AccordionTab

                header={
                  <div>
                    إدارة المستخدمين
                    <i className="bi bi-people ms-2"></i>
                  </div>
                }
              >
                <ul className={`accordion-menu p-0`}>
                  <li className="mb-1">
                    <Link
                      to="/owner"
                      className={`link-accordion ${isActive("/owner")}`}
                    >
                      إدارة الملاك
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/employee"
                      className={`link-accordion ${isActive("/employee")}`}
                    >
                      إدارة الموظفين
                    </Link>
                  </li>
                </ul>
              </AccordionTab>
            </Accordion>
          </li>
          <li className={`menu-item ${isActive("/customers")}`}>
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
