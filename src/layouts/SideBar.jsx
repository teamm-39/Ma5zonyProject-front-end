function SideBar() {
  return (
    <>
      <div className="sidebar">
        <ul className="menu m-0">
        <li className="menu-item active">
            <img src="icons/warehouse.svg" alt="إدارة المخازن" />
            <span> لوحة التحكم</span>
          </li>
          <li className="menu-item">
            <img src="icons/warehouse.svg" alt="إدارة المخازن" />
            <span>إدارة المخازن</span>
          </li>
          <li className="menu-item">
            <img src="icons/users.svg" alt="إدارة المستخدمين" />
            <span>إدارة المستخدمين</span>
          </li>
          <li className="menu-item">
            <img src="icons/customers.svg" alt="إدارة العملاء" />
            <span>إدارة العملاء</span>
          </li>
          <li className="menu-item">
            <img src="icons/reports.svg" alt="عرض تقرير" />
            <span>عرض تقرير</span>
          </li>
          <li className="menu-item">
            <img src="icons/suppliers.svg" alt="إدارة الموردين" />
            <span>إدارة الموردين</span>
          </li>
          <li className="menu-item">
            <img src="icons/products.svg" alt="إدارة المنتجات" />
            <span>إدارة المنتجات</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
