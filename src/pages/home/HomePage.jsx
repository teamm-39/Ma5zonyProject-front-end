import "../../assets/css/HomePage.css";
import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard"
function HomePage() {
  const items = [
    { label: "لوحة التحكم"},
  ];
  return (
    <AppCard>
       <div className="homepage-container m-0 p-0 pt-3">
      <AppBreadCrumb items={items} />
      <header className="header">
        <h1 className="title">مخزون</h1>
        <p className="subtitle">إدارة المستودعات والمخازن</p>
      </header>

      <div className="cards-container">
        <div className="card">
          <i className="icon">📦</i>
          <h3>إدارة المنتجات</h3>
        </div>
        <div className="card">
          <i className="icon">👥</i>
          <h3>إدارة المستخدمين</h3>
        </div>
        <div className="card">
          <i className="icon">🤝</i>
          <h3>إدارة العملاء</h3>
        </div>
        <div className="card">
          <i className="icon">📊</i>
          <h3>عرض تقرير</h3>
        </div>
        <div className="card">
          <i className="icon">🔧</i>
          <h3>إدارة الموردين</h3>
        </div>
        <div className="card">
          <i className="icon">🏢</i>
          <h3>إدارة المخازن</h3>
        </div>
      </div>
    </div>
   </AppCard>
  );
}

export default HomePage;