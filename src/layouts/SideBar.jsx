import { Link,useLocation } from "react-router-dom";
import "../assets/css/sidebar.css";
function SideBar() {
  const location=useLocation();
  return (
    <>
      <div className="sidebar">
        <ul className="menu m-0">
          <li className={`menu-item ${location.pathname=="/"?"active":""}`}>
            <Link to="/" className="link">
              <i className="bi bi-house-door ms-2"></i>
              لوحة التحكم
            </Link>
          </li>
          <li className={`menu-item ${location.pathname=="/store"?"active":""}`}>
            <Link to="/store" className="link">
              <i className="bi bi-building ms-2"></i>
              إدارة المخازن
            </Link>
          </li>
          <li className={`menu-item ${location.pathname=="/users"?"active":""}`}>
            <Link to="/users" className="link">
              <i className="bi bi-people ms-2"></i>
              إدارة المستخدمين
            </Link>
          </li>
          <li className={`menu-item ${location.pathname=="/customers"?"active":""}`}>
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
