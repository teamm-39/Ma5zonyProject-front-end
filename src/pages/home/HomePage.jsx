import "../../assets/css/HomePage.css";
import { IsLogedin } from "../../features/auth/services/IsLogedin";
function HomePage() {
  // const x=async ()=>{
  //   aswait IsLogedin()
  // }
  return (
    <div className="homepage-container m-0 p-0 pt-5">
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
  );
}

export default HomePage;