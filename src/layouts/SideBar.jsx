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
          <div className="navbar-brand d-flex align-items-center p-0 m-0 pe-4 gap-2">
            <img
              src={logo}
              alt="logo"
              className="me-2"
              width={30}
              style={{ height: "50px" }}
            />
            <div className="brand-name text-center  d-flex flex-column">
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
          <li className={`accordion-sidebar`}>
            <Accordion
              activeIndex={isActive("/owner") == "active" || isActive("/employee") ? 0 : undefined}
            >
              <AccordionTab
                header={
                  <div>
                    إدارة المستخدمين
                    <i className="bi bi-people ms-2"></i>
                  </div>
                }
              >
                <ul className={`accordion-menu p-0 mb-2`}>
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
                      className={`link-accordion ${isActive("/employee")} mb-1`}
                    >
                      إدارة الموظفين
                    </Link>
                  </li>
                </ul>
              </AccordionTab>
            </Accordion>
          </li>
          <li className={`accordion-sidebar`}>
            <Accordion
              activeIndex={isActive("/import") == "active" || isActive("/export") ? 0 : undefined}
            >
              <AccordionTab
                header={
                  <div>
                    إدارة العمليات
                    <i className="bi bi-gear ms-2"></i>
                  </div>
                }
              >
                <ul className={`accordion-menu p-0 mb-2`}>
                  <li className="mb-1">
                    <Link
                      to="/import"
                      className={`link-accordion ${isActive("/import")}`}
                    >
                      عمليات الاستيراد
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/export"
                      className={`link-accordion ${isActive("/export")} mb-1`}
                    >
                      عمليات التصدير
                    </Link>
                  </li>
                </ul>
              </AccordionTab>
            </Accordion>
          </li>
          <li className={`accordion-sidebar`}>
            <Accordion
              activeIndex={isActive("/logs") == "active" ? 0 : undefined}
            >
              <AccordionTab
                header={
                  <div>
                    عرض التقارير
                    <i className="fa-regular fa-file-lines ms-2"></i>
                  </div>
                }
              >
                <ul className={`accordion-menu p-0 mb-2`}>
                  <li className="mb-1">
                    <Link
                      to="/logs/store"
                      className={`link-accordion ${isActive("/logs/store")}`}
                    >
                      تقارير المخازن
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/export"
                      className={`link-accordion ${isActive("/export")} mb-1`}
                    >
                      عمليات التصدير
                    </Link>
                  </li>
                </ul>
              </AccordionTab>
            </Accordion>
          </li>
          <li className={`menu-item ${isActive("/store")}`}>
            <Link to="/store" className="link">
              إدارة المخازن
              <i className="bi bi-building ms-2"></i>
            </Link>
          </li>

          <li className={`menu-item ${isActive("/product")}`}>
            <Link to="/product" className="link w-100">
              إدارة المنتجات
              <i className="bi bi-box-seam ms-2"></i>
            </Link>
          </li>

          <li className={`menu-item ${isActive("/supplier")}`}>
            <Link to="/supplier" className="link w-100">
              إدارة الموردين
              <i className="bi bi-truck ms-2"></i>
            </Link>
          </li>

          <li className={`menu-item ${isActive("/customer")}`}>
            <Link to="/customer" className="link">
              إدارة العملاء
              <i className="bi bi-person-lines-fill ms-2"></i>
            </Link>
          </li>

        </ul>
      </div>
    </>
  );
}

export default SideBar;
